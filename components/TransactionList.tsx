import { Transaction } from '@/types/Transaction';
import { getTransactions } from '@/app/actions/getTransactions';
import TransactionItem from './TransactionItem';

const TransactionList = async () => {
    const { transactions, error } = await getTransactions();
    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="transaction-list">
            <h3>History</h3>

            {/* Scrollable wrapper */}
            <div className="max-h-[500px] overflow-y-auto">
                <ul className="list">
                    {transactions?.map((transaction: Transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TransactionList;
