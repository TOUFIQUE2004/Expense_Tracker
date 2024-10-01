'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function deleteTransaction(id: string): Promise<{
  message?: string;
  error?: string | null;
}> {
  const { userId } = auth();
  if (!userId) {
    return { error: 'User not found' };
  }
  try {
    await db.transaction.delete({
      where: {
        id,
      },
    });
    revalidatePath('/');
    return { message: 'Transaction deleted' };
  } catch (error) {
    return { error: 'Error deleting transaction' };
  }
}

export default deleteTransaction;
