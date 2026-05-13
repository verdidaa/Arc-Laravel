import { useSelector } from 'react-redux';
import UserDashboardTemplate from '../templates/UserDashboardTemplate.jsx';

const userNavItems = ['Home', 'Profile'];

function UserDashboardPage({ onLogout, user }) {
  const dashboard = useSelector((state) => state.auth.dashboard);

  return (
    <UserDashboardTemplate
      navItems={userNavItems}
      notice={dashboard.notices.products}
      onLogout={onLogout}
      products={dashboard.products}
      user={user}
    />
  );
}

export default UserDashboardPage;
