import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;