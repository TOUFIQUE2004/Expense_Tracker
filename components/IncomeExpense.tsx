import { getIncomeExpense } from '@/app/actions/getIncomeExpense';
import { addCommas } from '@/lib/utils';

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="inc-exp-container">
      <div>
        <h4 className="text-black font-bold text-xl mb-2">Income</h4>
        <p className="money plus text-black text-3xl font-bold">Rs{addCommas(Number(income?.toFixed(2) ?? 0))}</p>
      </div>
      <div className="separator"></div>
      <div>
        <h4 className="text-black font-bold text-xl mb-2">Expense</h4>
        <p className="money minus text-black text-3xl font-bold">Rs{addCommas(Number(expense?.toFixed(2) ?? 0))}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
