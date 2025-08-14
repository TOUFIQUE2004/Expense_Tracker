'use client';

import { Transaction } from '@/types/Transaction';
import { addCommas } from '@/lib/utils';
import { toast } from 'react-toastify';
import { deleteTransaction } from "@/app/actions/deleteTransaction";

interface TransactionItemProps {
  transaction: {
    id: string;
    text: string;
    amount: number;
    createdAt: Date;
  };
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const handleDelete = async () => {
    await deleteTransaction(transaction.id);
  };

  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text}{" "}
      <span>
        {transaction.amount > 0 ? '+' : '-'}Rs{addCommas(Math.abs(transaction.amount))}
      </span>
      <button onClick={handleDelete} className="delete-btn">
        x
      </button>
    </li>
  );
};

export default TransactionItem;
