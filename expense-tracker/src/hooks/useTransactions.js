import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc,
  deleteDoc,
  doc 
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const transactionsRef = collection(db, 'users', user.uid, 'transactions');
        const q = query(
          transactionsRef,
          orderBy('date', 'desc')
        );

        const unsubscribeSnapshot = onSnapshot(q, 
          (snapshot) => {
            const transactionList = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            const newBalance = transactionList.reduce((acc, transaction) => {
              return transaction.type === 'income' 
                ? acc + transaction.amount 
                : acc - transaction.amount;
            }, 0);
            
            setTransactions(transactionList);
            setBalance(newBalance);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching transactions:', error);
            setError(error);
            setLoading(false);
          }
        );

        return () => unsubscribeSnapshot();
      } else {
        setTransactions([]);
        setBalance(0);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTransaction = async (type, amount, description) => {
    if (!auth.currentUser) return;
    
    const transaction = {
      type,
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
      userId: auth.currentUser.uid
    };

    try {
      const userTransactionsRef = collection(
        db, 
        'users', 
        auth.currentUser.uid, 
        'transactions'
      );
      await addDoc(userTransactionsRef, transaction);
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    if (!auth.currentUser) return;
    
    try {
      const transactionRef = doc(
        db, 
        'users', 
        auth.currentUser.uid, 
        'transactions', 
        id
      );
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  return { 
    transactions, 
    balance, 
    loading, 
    error, 
    addTransaction, 
    deleteTransaction 
  };
};