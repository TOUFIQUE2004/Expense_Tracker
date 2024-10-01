'use server';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

interface transactionData {
  text: string;
  amount: number;
}

interface transactionResult {
  data?: transactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<transactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  if (!textValue || textValue === '' || !amountValue) {
    return { error: 'Please add a text and amount' };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactionData: transactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}

export default addTransaction;
