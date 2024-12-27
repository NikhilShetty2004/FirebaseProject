import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthContext } from './contexts/AuthContext';
import { Login } from './components/Login';
import { ExpenseTracker } from './pages/ExpenseTracker';
import { TransactionsPage } from './pages/TransactionsPage';
import { useTransactions } from './hooks/useTransactions';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const { transactions, balance, loading, addTransaction, deleteTransaction } = useTransactions();

  if (!user) return <Login />;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ExpenseTracker
            balance={balance}
            transactions={transactions}
            loading={loading}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
          />
        } 
      />
      <Route 
        path="/transactions" 
        element={
          <TransactionsPage
            transactions={transactions}
            loading={loading}
            onDelete={deleteTransaction}
          />
        } 
      />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;