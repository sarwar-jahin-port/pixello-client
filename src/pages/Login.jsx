import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const {user, login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
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
            Sign In
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;