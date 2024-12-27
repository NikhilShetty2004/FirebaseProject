import React from 'react';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';

export const BalanceDisplay = ({ balance = 0, loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        mb: 3, 
        textAlign: 'center',
        bgcolor: 'transparent',
        width: '100%'
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Available Balance
      </Typography>
      <Typography 
        variant="h3" 
        component="div" 
        sx={{ 
          fontWeight: 'bold',
          color: balance >= 0 ? 'success.main' : 'error.main'
        }}
      >
        ${Number(balance).toFixed(2)}
      </Typography>
    </Paper>
  );
};