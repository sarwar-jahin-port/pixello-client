import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authService } from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetData, setResetData] = useState(null);

  useEffect(() => {
    // Check if we have the reset data from the previous page
    const storedResetData = sessionStorage.getItem('resetData');
    if (storedResetData) {
      try {
        setResetData(JSON.parse(storedResetData));
      } catch (err) {
        console.error('Error parsing reset data:', err);
        setError('Invalid reset session. Please restart the password reset process.');
      }
    } else {
      setError('No reset session found. Please restart the password reset process.');
    }
  }, []);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError('Please enter and confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!resetData) {
      setError('No reset session found. Please restart the password reset process.');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await authService.resetPassword(
        resetData.usernameOrEmail,
        resetData.otp,
        newPassword
      );
      setSuccess('Password reset successful! Redirecting to login...');
      // Clear the session storage
      sessionStorage.removeItem('resetData');
      // Redirect to login after successful reset
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Password reset error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Password reset failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Reset Password
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {success}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1.2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 10px rgba(25, 118, 210, 0.3)'
                }
              }}
              disabled={loading || !resetData}
            >
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Return to Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResetPassword;