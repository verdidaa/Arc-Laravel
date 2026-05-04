import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginTemplate from '../templates/LoginTemplate.jsx';
import { loginUser } from '../../features/auth/authSlice.js';

function LoginPage() {
  const dispatch = useDispatch();
  const { error, seededAccounts, status } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('admin@northlane.shop');
  const [password, setPassword] = useState('admin123');

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <LoginTemplate
      email={email}
      error={error}
      helperText={`Seeded accounts: ${seededAccounts
        .map((account) => `${account.email} / ${account.password}`)
        .join(' | ')}`}
      onEmailChange={(event) => setEmail(event.target.value)}
      onPasswordChange={(event) => setPassword(event.target.value)}
      onSubmit={handleSubmit}
      password={password}
      submitLabel={status === 'loading' ? 'Signing In...' : 'Login'}
    />
  );
}

export default LoginPage;
