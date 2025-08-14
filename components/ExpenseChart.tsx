"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";
import { Transaction } from "@prisma/client"; // ✅ same type as in HomePage

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExpenseChartProps {
    transactions: Transaction[];
}

export default function ExpenseChart({ transactions }: ExpenseChartProps) {
    const labels = transactions.map((tx) =>
        new Date(tx.createdAt).toLocaleDateString("en-IN")
    );

    const data: ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: "Expenses",
                data: transactions.map((tx) => (tx.amount < 0 ? Math.abs(tx.amount) : 0)),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Income",
                data: transactions.map((tx) => (tx.amount > 0 ? tx.amount : 0)),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Expenses vs Income" },
        },
    };

    return <Bar data={data} options={options} />;
}
