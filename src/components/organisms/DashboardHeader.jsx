import { Box, Stack, Typography } from '@mui/material';

function DashboardHeader({
  subtitle = 'Here is your admin overview and current product list.',
  title,
  userName,
}) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 3 }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {title || `Admin ${userName}`}
        </Typography>
        <Typography color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

export default DashboardHeader;
