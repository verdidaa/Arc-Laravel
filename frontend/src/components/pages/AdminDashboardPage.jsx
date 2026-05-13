import { useSelector } from 'react-redux';
import AdminDashboardTemplate from '../templates/AdminDashboardTemplate.jsx';

const navItems = ['Dashboard', 'Users', 'Settings'];

function AdminDashboardPage({ onLogout, user }) {
  const dashboard = useSelector((state) => state.auth.dashboard);

  return (
    <AdminDashboardTemplate
      navItems={navItems}
      onLogout={onLogout}
      orderNotice={dashboard.notices.orders}
      orders={dashboard.orders}
      productNotice={dashboard.notices.products}
      products={dashboard.products}
      roles={dashboard.roles}
      stats={dashboard.stats}
      user={user}
    />
  );
}

export default AdminDashboardPage;
