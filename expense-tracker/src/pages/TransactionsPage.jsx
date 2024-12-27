import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

export const TransactionsPage = ({ transactions, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h5">All Transactions</Typography>
          </Box>
          
          <List sx={{ width: '100%' }}>
            {transactions.map((transaction) => (
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
                    onClick={() => onDelete(
                      transaction.id, 
                      transaction.type, 
                      transaction.amount
                    )}
                  >
                    <DeleteIcon />
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
        </Paper>
      </Container>
    </Box>
  );
};