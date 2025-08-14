import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as XLSX from "xlsx";

// Convert DD-MM-YY → YYYY-MM-DD
function normalizeDate(dateStr: string): string {
    if (!dateStr) return new Date().toISOString();
    const [dd, mm, yy] = dateStr.split("-");
    return `20${yy}-${mm}-${dd}`;
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // First, ensure the user exists in our database
        let user = await db.user.findUnique({
            where: { clerkUserId: userId }
        });

        if (!user) {
            // Create user if they don't exist
            user = await db.user.create({
                data: {
                    clerkUserId: userId,
                    email: "", // You might want to get this from Clerk
                    name: "" // You might want to get this from Clerk
                }
            });
        }

        const form = await req.formData();
        const file = form.get("file") as File | null;

        if (!file) {
            return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
        }

        // Buffer from uploaded file
        const buffer = Buffer.from(await file.arrayBuffer());

        // Read workbook
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON rows
        const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });

        const imported = [];

        for (const row of rows) {
            // Ensure keys match Excel exactly
            const txnDate = String(row["Txn Date"] || "").trim();
            const desc = String(row["Description"] || "").trim();
            const debit = parseFloat((row["Debit (₹)"] || "0").toString().replace(/,/g, "")) || 0;
            const credit = parseFloat((row["Credit (₹)"] || "0").toString().replace(/,/g, "")) || 0;

            if (!txnDate) continue;

            const amount = credit > 0 ? credit : -debit;

            // Add to database
            const tx = await db.transaction.create({
                data: {
                    userId: user.id, // Use the database user ID, not clerk ID
                    text: desc,
                    amount,
                    createdAt: new Date(normalizeDate(txnDate)),
                },
            });

            imported.push(tx);
        }

        return new Response(JSON.stringify({ 
            success: true,
            imported: imported.length,
            message: `Successfully imported ${imported.length} transactions`
        }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err: any) {
        console.error('Import error:', err);
        return new Response(JSON.stringify({ 
            error: err.message || "Something went wrong",
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
