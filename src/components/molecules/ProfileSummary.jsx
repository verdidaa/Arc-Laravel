import { Avatar, Box, LinearProgress, Stack, Typography } from '@mui/material';

function ProfileSummary({ user }) {
  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: '#1d4ed8' }}>OA</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography color="text.secondary">{user.role}</Typography>
        </Box>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 1 }}>
        {user.email}
      </Typography>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>Profile completion</Typography>
      <LinearProgress
        variant="determinate"
        value={user.completion}
        sx={{
          height: 10,
          borderRadius: 999,
          backgroundColor: '#e2e8f0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            backgroundColor: '#1d4ed8',
          },
        }}
      />
      <Typography sx={{ mt: 1.25, color: '#1d4ed8', fontWeight: 600 }}>
        {user.completion}% complete
      </Typography>
    </>
  );
}

export default ProfileSummary;
