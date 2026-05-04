import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import AppShell from '../atoms/AppShell.jsx';
import InfoBadge from '../atoms/InfoBadge.jsx';
import LoginForm from '../organisms/LoginForm.jsx';

function LoginTemplate({
  email,
  error,
  helperText,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  password,
  submitLabel,
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
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            minHeight: '100dvh',
          }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              background:
                'linear-gradient(180deg, #0f172a 0%, #172554 55%, #1d4ed8 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <InfoBadge
              label="Dashboard System"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#e2e8f0',
                alignSelf: 'flex-start',
              }}
            />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Arch System
            </Typography>
            <Typography sx={{ maxWidth: 420, color: 'rgba(255,255,255,0.75)', mb: 4 }}>
              Login now maps access from the matched account, which is closer to how a
              Laravel backend will return the authenticated user and role.
            </Typography>

            <Stack spacing={2}>
              {[
                'Admin page with user roles management',
                'User page with product table and pagination',
                'Single login entry for both system roles',
              ].map((item) => (
                <Card
                  key={item}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontWeight: 600 }}>{item}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, md: 6 },
              backgroundColor: '#f8fafc',
            }}
          >
            <Card
              elevation={0}
              sx={{
                width: '100%',
                maxWidth: 440,
                borderRadius: 4,
                border: '1px solid rgba(15, 23, 42, 0.08)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={onSubmit}>
                  <LoginForm
                    email={email}
                    error={error}
                    helperText={helperText}
                    onEmailChange={onEmailChange}
                    onPasswordChange={onPasswordChange}
                    password={password}
                    submitLabel={submitLabel}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </AppShell>
  );
}

export default LoginTemplate;
