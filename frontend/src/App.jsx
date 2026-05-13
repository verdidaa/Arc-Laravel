import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboardPage from './components/pages/AdminDashboardPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import UserDashboardPage from './components/pages/UserDashboardPage.jsx';
import { fetchCurrentUser, logoutUser } from './features/auth/authSlice.js';

function App() {
  const dispatch = useDispatch();
  const { token, user: sessionUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  if (!sessionUser) {
    return <LoginPage />;
  }

  if (sessionUser.accessLevel === 'admin') {
    return (
      <AdminDashboardPage
        user={sessionUser}
        onLogout={() => dispatch(logoutUser())}
      />
    );
  }

  return (
    <UserDashboardPage
      user={sessionUser}
      onLogout={() => dispatch(logoutUser())}
    />
  );
}

export default App;
