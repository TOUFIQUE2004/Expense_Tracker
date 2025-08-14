"use client";

import { Transaction } from "@prisma/client";

interface DailyAveragesProps {
  transactions: Transaction[];
}

const DailyAverages = ({ transactions }: DailyAveragesProps) => {
  // Filter expenses (negative amounts)
  const expenses = transactions.filter(t => t.amount < 0);
  
  // Calculate overall statistics
  const totalExpenses = Math.abs(expenses.reduce((sum, t) => sum + t.amount, 0));
  const overallAverage = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  
  // Get last 7 days data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const dailyStats = last7Days.map(date => {
    const dayExpenses = expenses.filter(t => {
      const txnDate = new Date(t.createdAt);
      return txnDate.toDateString() === date.toDateString();
    });
    
    const dayTotal = Math.abs(dayExpenses.reduce((sum, t) => sum + t.amount, 0));
    const dayAverage = dayExpenses.length > 0 ? dayTotal / dayExpenses.length : 0;
    
    return {
      date,
      count: dayExpenses.length,
      total: dayTotal,
      average: dayAverage
    };
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-2">Daily Expense Averages</h3>
        <p className="text-lg text-gray-700">Track your spending patterns over time</p>
      </div>
      
      {/* Overall Statistics */}
      <div className="bg-white bg-opacity-20 p-6 rounded-xl border border-white border-opacity-30">
        <h4 className="text-xl font-bold mb-4 text-center">Overall Statistics</h4>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">Rs{overallAverage.toFixed(0)}</div>
            <div className="text-white text-opacity-90">Average Expense</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">{expenses.length}</div>
            <div className="text-white text-opacity-90">Total Transactions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Rs{totalExpenses.toLocaleString()}</div>
            <div className="text-white text-opacity-90">Total Expenses</div>
          </div>
        </div>
      </div>

      {/* Last 7 Days Table */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-center">Last 7 Days</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white bg-opacity-20 rounded-xl overflow-hidden">
            <thead className="bg-white bg-opacity-30">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold text-white">Date</th>
                <th className="px-6 py-4 text-center text-lg font-bold text-white">Transactions</th>
                <th className="px-6 py-4 text-right text-lg font-bold text-white">Total</th>
                <th className="px-6 py-4 text-right text-lg font-bold text-white">Average</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((day, index) => (
                <tr key={index} className={day.count > 0 ? "hover:bg-white hover:bg-opacity-20 transition-colors" : "text-white text-opacity-60"}>
                  <td className="px-6 py-4 font-medium text-white">
                    {day.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-center text-white">{day.count}</td>
                  <td className="px-6 py-4 text-right text-white">
                    {day.total > 0 ? `Rs${day.total.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right text-white">
                    {day.average > 0 ? `Rs${day.average.toFixed(0)}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyAverages;
