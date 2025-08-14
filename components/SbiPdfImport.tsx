"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SbiPdfImport = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/import-sbi-excel", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error(await res.text());

            await res.json();
            setSuccess(true);
            setFile(null);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-lg text-gray-700 mb-2">
                    Upload your SBI Excel statement to automatically import transactions
                </p>
                <p className="text-sm text-gray-600">
                    Supports .xlsx, .xls, and .csv files
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                    <label htmlFor="file" className="block text-lg font-bold text-gray-800 text-center">
                        Select Excel File
                    </label>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                        <input
                            type="file"
                            id="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            className="hidden"
                        />
                        <label htmlFor="file" className="cursor-pointer">
                            <div className="text-4xl mb-3">📁</div>
                            <div className="text-lg font-medium text-gray-700 mb-2">
                                {file ? file.name : "Click to browse or drag & drop"}
                            </div>
                            <div className="text-sm text-gray-500">
                                {file ? "File selected successfully!" : "Choose your Excel file"}
                            </div>
                        </label>
                    </div>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        disabled={loading || !file}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                📥 Import Excel
                            </span>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                    <div className="text-xl mb-2">⚠️</div>
                    <div className="font-medium">{error}</div>
                </div>
            )}
            
            {success && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
                    <div className="text-xl mb-2">✅</div>
                    <div className="font-medium">Excel imported successfully!</div>
                    <div className="text-sm mt-1">Your transactions have been added to the system.</div>
                </div>
            )}
        </div>
    );
};

export default SbiPdfImport;
