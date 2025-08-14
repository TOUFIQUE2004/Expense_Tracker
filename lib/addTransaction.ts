export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    description?: string;
    category?: string;
}

let transactions: Transaction[] = [];

/**
 * Adds a new transaction to the transactions list.
 * @param transaction The transaction to add.
 * @returns The added transaction.
 */
export function addTransaction(transaction: Transaction): Transaction {
    transactions.push(transaction);
    return transaction;
}

/**
 * Returns all transactions.
 */
export function getTransactions(): Transaction[] {
    return [...transactions];
}