// Function to add commas to numbers for better formatting
export function addCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to classify transactions based on description
export function classifyTransaction(description: string): string {
    const desc = description.toLowerCase();
    
    if (desc.includes('upi') || desc.includes('google pay') || desc.includes('phonepe') || desc.includes('paytm')) {
        return 'UPI';
    } else if (desc.includes('atm') || desc.includes('cash withdrawal')) {
        return 'ATM';
    } else if (desc.includes('pos') || desc.includes('debit card')) {
        return 'Card Payment';
    } else if (desc.includes('neft') || desc.includes('imps') || desc.includes('rtgs')) {
        return 'Bank Transfer';
    } else if (desc.includes('salary') || desc.includes('credit')) {
        return 'Income';
    } else if (desc.includes('interest') || desc.includes('dividend')) {
        return 'Investment';
    } else if (desc.includes('rent') || desc.includes('electricity') || desc.includes('water')) {
        return 'Utilities';
    } else if (desc.includes('food') || desc.includes('restaurant') || desc.includes('swiggy') || desc.includes('zomato')) {
        return 'Food & Dining';
    } else if (desc.includes('fuel') || desc.includes('petrol') || desc.includes('diesel')) {
        return 'Transportation';
    } else if (desc.includes('shopping') || desc.includes('amazon') || desc.includes('flipkart')) {
        return 'Shopping';
    } else {
        return 'Other';
    }
}
