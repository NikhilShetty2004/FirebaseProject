import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

export const TransactionDialog = ({ open, onClose, type, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !description) return;
    setLoading(true);
    try {
      await onAdd(type, parseFloat(amount), description);
      setAmount('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}
    aria-labelledby="transaction-dialog-title"
    disableScrollLock
    >
      <DialogTitle id="transaction-dialog-title">
        Add {type === 'income' ? 'Income' : 'Expense'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color={type === 'income' ? 'success' : 'error'}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};