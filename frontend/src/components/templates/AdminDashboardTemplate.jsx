import { Box, Stack } from '@mui/material';
import AppShell from '../atoms/AppShell.jsx';
import DashboardHeader from '../organisms/DashboardHeader.jsx';
import ProductTable from '../organisms/ProductTable.jsx';
import ProfileCard from '../organisms/ProfileCard.jsx';
import RecentOrdersCard from '../organisms/RecentOrdersCard.jsx';
import Sidebar from '../organisms/Sidebar.jsx';
import StatsGrid from '../organisms/StatsGrid.jsx';
import UserRolesTable from '../organisms/UserRolesTable.jsx';

function AdminDashboardTemplate({
  navItems,
  onLogout,
  orders,
  products,
  roles,
  stats,
  user,
}) {
  return (
    <AppShell>
      <Box
        sx={{
          width: '100%',
          minHeight: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '280px 1fr' },
            minHeight: '100%',
          }}
        >
          <Sidebar navItems={navItems} onLogout={onLogout} />

          <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: '#f8fafc' }}>
            <DashboardHeader userName={user.name} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', xl: '1.55fr 0.85fr' },
                gap: 3,
              }}
            >
              <Box>
                <StatsGrid stats={stats} />
                <Box sx={{ display: 'grid', gap: 3 }}>
                  <UserRolesTable roles={roles} />
                  <ProductTable
                    products={products}
                    subtitle="Catalog overview currently managed by admin users"
                    title="Managed Products"
                  />
                </Box>
              </Box>

              <Stack spacing={3}>
                <ProfileCard user={user} />
                <RecentOrdersCard orders={orders} />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

export default AdminDashboardTemplate;
