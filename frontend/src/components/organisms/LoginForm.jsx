import { Alert, Box, Stack, TextField, Typography } from '@mui/material';
import PrimaryButton from '../atoms/PrimaryButton.jsx';

function LoginForm({
  email,
  error,
  helperText,
  onEmailChange,
  onPasswordChange,
  password,
  submitLabel = 'Login',
}) {
  return (
    <Box>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Login
          </Typography>
          <Typography color="text.secondary">
            Sign in with your account.
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Email Address"
          onChange={onEmailChange}
          type="email"
          value={email}
        />
        <TextField
          fullWidth
          label="Password"
          onChange={onPasswordChange}
          type="password"
          value={password}
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Typography color="text.secondary" variant="body2">
          {helperText}
        </Typography>

        <PrimaryButton type="submit">{submitLabel}</PrimaryButton>
      </Stack>
    </Box>
  );
}

export default LoginForm;
