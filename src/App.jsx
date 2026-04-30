import { useDispatch, useSelector } from 'react-redux';
import AdminDashboardPage from './components/pages/AdminDashboardPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import UserDashboardPage from './components/pages/UserDashboardPage.jsx';
import { logoutUser } from './features/auth/authSlice.js';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.auth.user);

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
