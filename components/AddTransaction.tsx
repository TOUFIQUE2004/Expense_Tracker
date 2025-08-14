'use client';
import { useRef } from 'react';
import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';

const AddTransaction = (): JSX.Element => {

  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const {data, error} = await addTransaction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added successfully!');
      formRef.current?.reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💰</div>
        <p className="text-xl text-gray-700">Record your income or expenses with smart categorization</p>
      </div>

      <form ref={formRef} action={clientAction} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label htmlFor="text" className="block text-xl font-bold text-gray-800">
              📝 Description
            </label>
            <input 
              type="text" 
              id="text" 
              name="text" 
              placeholder="e.g., Grocery shopping, Salary payment..." 
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
              required 
            />
          </div>
          
          <div className="space-y-3">
            <label htmlFor="amount" className="block text-xl font-bold text-gray-800">
              💵 Amount
            </label>
            <input 
              type="number" 
              id="amount" 
              name="amount" 
              placeholder="0.00" 
              step="0.01" 
              className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
              required 
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700 font-medium">
                💡 <span className="font-bold">Tip:</span> Use negative (-) for expenses, positive (+) for income
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <label htmlFor="classification" className="block text-xl font-bold text-gray-800 text-center">
            🏷️ Category
          </label>
          <select 
            id="classification" 
            name="classification" 
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-sm hover:shadow-md"
            required
          >
            <option value="">Select a category...</option>
            <option value="UPI">💳 UPI</option>
            <option value="ATM">🏧 ATM</option>
            <option value="Card Payment">💳 Card Payment</option>
            <option value="Bank Transfer">🏦 Bank Transfer</option>
            <option value="Income">💰 Income</option>
            <option value="Investment">📈 Investment</option>
            <option value="Utilities">⚡ Utilities</option>
            <option value="Food & Dining">🍽️ Food & Dining</option>
            <option value="Transportation">🚗 Transportation</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Other">📝 Other</option>
          </select>
        </div>
        
        <div className="text-center pt-6">
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25"
          >
            ➕ Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
