import {
  navItems,
  products,
  recentOrders,
  stats,
  userRoles,
} from '../data/dashboardData.js';
import AdminDashboardTemplate from '../templates/AdminDashboardTemplate.jsx';

function AdminDashboardPage({ onLogout, user }) {
  return (
    <AdminDashboardTemplate
      navItems={navItems}
      onLogout={onLogout}
      orders={recentOrders}
      products={products}
      roles={userRoles}
      stats={stats}
      user={user}
    />
  );
}

export default AdminDashboardPage;
