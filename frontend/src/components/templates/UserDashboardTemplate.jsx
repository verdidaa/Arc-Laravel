import { Box } from '@mui/material';
import AppShell from '../atoms/AppShell.jsx';
import DashboardHeader from '../organisms/DashboardHeader.jsx';
import ProductTable from '../organisms/ProductTable.jsx';
import Sidebar from '../organisms/Sidebar.jsx';

function UserDashboardTemplate({
  navItems,
  notice,
  onLogout,
  products,
  user,
}) {
  return (
    <AppShell>
      <Box
        sx={{
          width: '100vw',
          minHeight: '100dvh',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
            minHeight: '100dvh',
          }}
        >
          <Sidebar
            navItems={navItems}
            onLogout={onLogout}
            selectedIndex={0}
            subtitle="Browse products and review your account."
            title="Dashboard"
          />

          <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: '#f8fafc' }}>
            <DashboardHeader
              subtitle="This view is now backed by the Laravel API and your database record."
              title={`${user.name}`}
            />

            <ProductTable
              emptyMessage={notice}
              products={products}
              subtitle="Products assigned to your account from the backend database"
              title="Available Products"
            />
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

export default UserDashboardTemplate;
