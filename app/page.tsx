import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import DailyAverages from "@/components/DailyAverages";
import Footer from "@/components/Footer";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { Transaction } from "@prisma/client";
import SbiPdfImport from "@/components/SbiPdfImport";

const HomePage = async () => {
    const user = await currentUser();

    if (!user) {
        return <Guest />;
    }

    // Ensure the user exists in DB
    await checkUser(user);

    // Fetch transactions from Prisma using clerkUserId
    const transactions: Transaction[] = await db.transaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
    });

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6 pt-20">
            {/* Welcome */}
            <div id="welcome" className="box box-welcome">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    Welcome, {user.firstName}!
                </h2>
                <p className="text-lg text-center opacity-90">
                    Track your expenses, analyze spending patterns, and take control of your finances
                </p>
            </div>

            {/* Balance */}
            <div id="balance" className="space-y-4">
                <div className="box box-balance"><Balance /></div>
                <div className="box box-balance"><IncomeExpense /></div>
            </div>

            {/* Charts */}
            <div id="charts" className="box box-charts">
                <h3 className="text-2xl font-bold mb-6 text-center">TRANSACTION_CHART</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[1000px] xl:h-[1000px] flex flex-col items-center justify-center">
                        <ExpensePieChart transactions={transactions} />
                    </div>
                </div>
            </div>

            {/* Daily Averages */}
            <div className="box box-daily">
                <DailyAverages transactions={transactions} />
            </div>

            {/* Add Transaction */}
            <div id="add" className="box box-add">
                <h3 className="text-2xl font-bold mb-6 text-center">Add New Transaction</h3>
                <AddTransaction />
            </div>

            {/* Import Excel */}
            <div id="import" className="box box-import">
                <h3 className="text-2xl font-bold mb-6 text-center">Import Excel</h3>
                <SbiPdfImport />
            </div>

            {/* Transaction List */}
            <div id="transactions" className="box box-transactions">
                <h3 className="text-2xl font-bold mb-6 text-center">Transaction History</h3>
                <TransactionList />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
