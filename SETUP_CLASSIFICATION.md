# Expense Classification Setup Guide

## What's Been Implemented

✅ **Pie Chart Component**: Created `ExpensePieChart.tsx` with hover effects and detailed breakdown
✅ **Classification Logic**: Added automatic transaction classification based on description text
✅ **Import Route**: Updated SBI Excel import to calculate classifications
✅ **Page Integration**: Added pie chart to the main page alongside existing charts

## What Needs to Be Done

### 1. Update Database Schema
The `classification` field needs to be added to the Transaction table. Run this when your database is accessible:

```bash
npx prisma migrate dev --name add_classification_field
```

### 2. Enable Classification Storage
Once the migration is complete, uncomment this line in `app/api/import-sbi-excel/route.ts`:

```typescript
classification, // Uncomment when schema is updated
```

## Features

### Automatic Classification Categories:
- **UPI**: UPI, Google Pay, PhonePe, Paytm
- **ATM**: ATM withdrawals, cash withdrawals
- **Card Payment**: POS, debit card transactions
- **Bank Transfer**: NEFT, IMPS, RTGS
- **Income**: Salary, credits
- **Investment**: Interest, dividends
- **Utilities**: Rent, electricity, water
- **Food & Dining**: Food, restaurants, Swiggy, Zomato
- **Transportation**: Fuel, petrol, diesel
- **Shopping**: Shopping, Amazon, Flipkart
- **Other**: Unclassified transactions

### Pie Chart Features:
- **Interactive Hover Effects**: Enhanced tooltips with percentage and amount
- **Color-coded Sections**: Each classification has a unique color
- **Detailed Breakdown**: Shows total, count, and average for each category
- **Responsive Design**: Works on both desktop and mobile
- **Smooth Animations**: Rotate and scale animations on chart load

## Current Status

The pie chart is fully functional and will automatically classify transactions based on their description text. It works with existing transaction data even without the database field, calculating classifications on-the-fly.

Once you complete the database migration, the classifications will be stored permanently and the system will be more efficient.
