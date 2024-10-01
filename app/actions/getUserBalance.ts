'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function getUserBalance(): Promise<{
  balance?: number;
  error?: string | null;
}> {
  const { userId } = auth();
  if (!userId) {
    return { error: 'User not found' };
  }
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });
    const balance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return { balance };
  } catch (error) {
    return { error: 'Error fetching transactions' };
  }
}

export default getUserBalance;
