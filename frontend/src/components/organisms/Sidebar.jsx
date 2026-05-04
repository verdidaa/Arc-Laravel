import { Box, Button, Typography } from '@mui/material';
import NavMenu from '../molecules/NavMenu.jsx';

function Sidebar({
  navItems,
  onLogout,
  selectedIndex = 0,
  subtitle = 'Manage your store from one dashboard.',
  title = 'Admin Dashboard',
}) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #0f172a 0%, #172554 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.68)', mb: 4 }}>
          {subtitle}
        </Typography>

        <NavMenu items={navItems} selectedIndex={selectedIndex} />
      </Box>

      {onLogout ? (
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            pt: 3,
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.68)', letterSpacing: 1.1 }}
          >
            Settings
          </Typography>
          <Button
            fullWidth
            onClick={onLogout}
            sx={{
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 3,
              color: '#fff',
              justifyContent: 'flex-start',
              mt: 1,
              px: 2,
              py: 1.2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.34)',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}

export default Sidebar;
