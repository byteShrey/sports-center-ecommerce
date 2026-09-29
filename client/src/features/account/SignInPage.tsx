import { useState, type FormEvent } from 'react';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signIn } from './accountSlice';

interface LocationState {
  from?: string;
}

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signingIn, error } = useAppSelector((state) => state.account);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirectTo = (location.state as LocationState | null)?.from ?? '/catalog';

  if (user) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await dispatch(signIn({ username: username.trim(), password }));
    if (signIn.fulfilled.match(result)) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 2, md: 6 } }}>
      <Paper variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to place orders and see your order history.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Username"
            autoComplete="username"
            required
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained" size="large" disabled={signingIn}>
            {signingIn ? 'Signing in…' : 'Sign in'}
          </Button>

          <Alert severity="info" variant="outlined">
            Demo account: <strong>shopper</strong> / <strong>Password123</strong>
          </Alert>
        </Stack>
      </Paper>
    </Box>
  );
}
