import React, { useState, useContext } from 'react';
import {
  Container,
  Paper,
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { BalanceDisplay } from '../components/BalanceDisplay';
import { RecentTransactions } from '../components/RecentTransactions';
import { TransactionDialog } from '../components/TransactionDialog';
import { useTransactions } from '../hooks/useTransactions';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const ExpenseTracker = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const { transactions, balance, loading, addTransaction, deleteTransaction } = useTransactions();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          sx={{ 
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* User Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Signed in as
              </Typography>
              <Typography variant="body2">
                {user?.email}
              </Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton 
                onClick={handleLogout}
                color="primary"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Divider sx={{ mb: 3 }} />

          <BalanceDisplay balance={balance} loading={loading} />
          
          <RecentTransactions 
            transactions={transactions}
            onDelete={deleteTransaction}
            loading={loading}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={() => {
                  setTransactionType('income');
                  setOpenAddDialog(true);
                }}
                sx={{ height: '50px', borderRadius: 2 }}
              >
                Add Income
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => {
                  setTransactionType('expense');
                  setOpenAddDialog(true);
                }}
                sx={{ height: '50px', borderRadius: 2 }}
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>

          <TransactionDialog
            open={openAddDialog}
            onClose={() => setOpenAddDialog(false)}
            type={transactionType}
            onAdd={addTransaction}
          />
        </Paper>
      </Container>
    </Box>
  );
};
