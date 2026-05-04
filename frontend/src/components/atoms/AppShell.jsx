import { Box } from '@mui/material';

function AppShell({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #f5f7fb 0%, #eaf1ff 100%)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
}

export default AppShell;
