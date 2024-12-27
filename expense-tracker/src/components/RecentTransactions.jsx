import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const RecentTransactions = ({ 
  transactions = [], 
  onDelete, 
  loading,
  limit = 2 
}) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, type, amount) => {
    setDeletingId(id);
    try {
      await onDelete(id, type, amount);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!transactions?.length) {
    return (
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography color="text.secondary">
          No transactions yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Recent Transactions</Typography>
        {transactions.length > limit && (
          <Button 
            size="small" 
            onClick={() => navigate('/transactions')}
          >
            See All
          </Button>
        )}
      </Box>
      <List>
        {transactions.slice(0, limit).map((transaction) => (
          <ListItem
            key={transaction.id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
            secondaryAction={
              <IconButton 
                edge="end" 
                onClick={() => handleDelete(
                  transaction.id, 
                  transaction.type, 
                  transaction.amount
                )}
                disabled={deletingId === transaction.id}
              >
                {deletingId === transaction.id ? 
                  <CircularProgress size={24} /> : 
                  <DeleteIcon />
                }
              </IconButton>
            }
          >
            <ListItemIcon>
              {transaction.type === 'income' ? (
                <TrendingUp color="success" />
              ) : (
                <TrendingDown color="error" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={transaction.description}
              secondary={`${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)} • ${transaction.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentTransactions;