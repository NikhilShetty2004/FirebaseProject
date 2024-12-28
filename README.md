# Expense Tracker

A modern expense tracking application built with React, Material-UI, and Firebase. Track your income and expenses with a clean, intuitive interface and real-time updates.

## Features

- Google Authentication
- Real-time transaction tracking
- Income and expense management
- Balance calculation
- Transaction history
- Responsive Material UI design
- Secure data storage with Firebase

## Tech Stack

- React.js
- Firebase (Authentication & Firestore)
- Material-UI (MUI)
- React Router

## Project Structure

```
src/
├── components/
│   ├── BalanceDisplay.jsx
│   ├── RecentTransactions.jsx
│   └── TransactionDialog.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   └── useTransactions.js
├── firebase.js
└── App.jsx
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Deploy
https://transaction-1b2e9.web.app/
