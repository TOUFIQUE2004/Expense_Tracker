# Expense Tracker Next.js Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

The Expense Tracker is a web application that allows users to track their income and expenses. It provides features such as adding transactions, viewing transaction history, and calculating the balance. The application is built using Next.js, React, and Prisma, and it uses Clerk for authentication.

## Getting Started

First, run the development server:

---

```
npm run dev
```
or
```
yarn dev
```
or
```
pnpm dev
```
or
```
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **User Authentication**: Implemented using Clerk for secure user login and management.
- **Transaction Management**: Users can add, view, and delete transactions.
- **Balance Calculation**: Automatically calculates and displays the user's balance.
- **Responsive Design**: The application is responsive and works well on both desktop and mobile devices.

## Technologies Used

- **Next.js**: A React framework for building fast web applications.
- **React**: A JavaScript library for building user interfaces.
- **Prisma**: An ORM for interacting with the database.
- **Clerk**: A user management and authentication service.
- **PostgreSQL**: The database used for storing user and transaction data.

## Database Schema

The database schema is defined using Prisma. It includes two main models: `User` and `Transaction`.

- **User**: Stores user information such as `id`, `clerkUserId`, `email`, `name`, and `imageUrl`.
- **Transaction**: Stores transaction details including `id`, `text`, `amount`, and `userId`.

For more details, refer to the `schema.prisma` file.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.