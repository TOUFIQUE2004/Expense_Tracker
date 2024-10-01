'use client';

import { Transaction } from '@/types/Transaction';
import { addCommas } from '@/lib/utils';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const handleDeleteTransaction = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) {
      return;
    }
    const { message, error } = await deleteTransaction(id);
    if (error) {
      toast.error(error);
    } else {
      toast.success(message);
    }
  };

  return (
    <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
      {transaction.text}
      <span>
        {transaction.amount > 0 ? '+' : '-'}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => {
          handleDeleteTransaction(transaction.id);
        }}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
