import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Stack
} from '@mui/material';
import { authService } from '../services/api';

const ForgotPassword = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    
    if (!usernameOrEmail.trim()) {
      setError('Please enter your username or email');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await authService.requestPasswordReset(usernameOrEmail);
      setSuccess('OTP has been sent to your email address');
      setOtpSent(true);
    } catch (err) {
      console.error('OTP request error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send OTP. Please check your username/email and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await authService.verifyOTP(usernameOrEmail, otp);
      setSuccess('OTP verified successfully. You will be redirected to reset your password.');
      // Store the verified OTP and username/email in sessionStorage for the reset page
      sessionStorage.setItem('resetData', JSON.stringify({ usernameOrEmail, otp }));
      // Redirect to reset password page after verification
      setTimeout(() => {
        window.location.href = '/reset-password';
      }, 1500);
    } catch (err) {
      console.error('OTP verification error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid OTP. Please try again.');
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
            {otpSent ? 'Verify OTP' : 'Forgot Password'}
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
          
          {!otpSent ? (
            <Box component="form" onSubmit={handleRequestOTP} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usernameOrEmail"
                label="Username or Email"
                name="usernameOrEmail"
                autoComplete="username"
                autoFocus
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Send OTP'}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyOTP} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setOtpSent(false);
                    setSuccess('');
                  }}
                  disabled={loading}
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    py: 1.2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px rgba(25, 118, 210, 0.3)'
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                </Button>
              </Stack>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Remember your password?
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;