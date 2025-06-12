import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        height: '100vh', // Full viewport height
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
