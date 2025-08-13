'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart({ transactions }) {
    const labels = transactions.map(tx => new Date(tx.createdAt).toLocaleDateString("en-IN"));

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: transactions.map(tx => tx.amount < 0 ? Math.abs(tx.amount) : 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Income',
                data: transactions.map(tx => tx.amount > 0 ? tx.amount : 0),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ],
    };

    return <Bar data={data} />;
}
