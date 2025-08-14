"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from "chart.js";
import { classifyTransaction } from "@/lib/utils";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
    id: string;
    text: string;
    amount: number;
    classification?: string;
    createdAt: Date;
}

interface ExpensePieChartProps {
    transactions: Transaction[];
}

export default function ExpensePieChart({ transactions }: ExpensePieChartProps) {
    // Filter only expenses (negative amounts)
    const expenses = transactions.filter(tx => tx.amount < 0);
    
    // Group expenses by classification (calculate on-the-fly since it's not stored yet)
    const classificationMap = new Map<string, number>();
    
    expenses.forEach(tx => {
        // Use stored classification if available, otherwise calculate it
        const classification = tx.classification || classifyTransaction(tx.text);
        const currentAmount = classificationMap.get(classification) || 0;
        classificationMap.set(classification, currentAmount + Math.abs(tx.amount));
    });
    
    // Convert to chart data format
    const labels = Array.from(classificationMap.keys());
    const data = Array.from(classificationMap.values());
    
    // Generate colors for each classification
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
    ];
    
    const backgroundColor = labels.map((_, index) => colors[index % colors.length]);
    const hoverBackgroundColor = backgroundColor.map(color => 
        color.replace(')', ', 0.8)').replace('rgb', 'rgba')
    );

    const chartData: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                hoverBackgroundColor,
                borderWidth: 3,
                borderColor: '#fff',
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: Rs${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Expenses by Classification',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true
        },
        elements: {
            arc: {
                borderWidth: 3
            }
        }
    };

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    
    // Calculate average expenses per classification
    const averageExpenses = labels.map(label => {
        const amount = classificationMap.get(label) || 0;
        const count = expenses.filter(tx => {
            const txClassification = tx.classification || classifyTransaction(tx.text);
            return txClassification === label;
        }).length;
        return count > 0 ? amount / count : 0;
    });

    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Expense Classification Overview
                </h3>
                <p className="text-lg text-gray-600 font-medium">
                    Total Expenses: Rs{totalExpenses.toLocaleString()}
                </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Pie Chart - Made Larger */}
                <div className="h-96 xl:h-[500px] flex items-center justify-center">
                    <Doughnut data={chartData} options={options} />
                </div>
                
                {/* Classification Details */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">Classification Details</h4>
                    {labels.map((label, index) => {
                        const amount = classificationMap.get(label) || 0;
                        const count = expenses.filter(tx => {
                            const txClassification = tx.classification || classifyTransaction(tx.text);
                            return txClassification === label;
                        }).length;
                        const average = count > 0 ? amount / count : 0;
                        const percentage = ((amount / totalExpenses) * 100).toFixed(1);
                        
                        return (
                            <div 
                                key={label}
                                className="p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                                style={{ borderLeftColor: colors[index % colors.length], borderLeftWidth: '6px' }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold text-gray-800">{label}</span>
                                    <span className="text-lg font-bold text-blue-600">{percentage}%</span>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p><span className="font-semibold">Total:</span> Rs{amount.toLocaleString()}</p>
                                    <p><span className="font-semibold">Count:</span> {count} transactions</p>
                                    <p><span className="font-semibold">Average:</span> Rs{average.toFixed(0)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
