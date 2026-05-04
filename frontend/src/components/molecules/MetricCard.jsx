import { Card, CardContent, Typography } from '@mui/material';

function MetricCard({ label, value, detail, color }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography sx={{ color, fontWeight: 600 }}>{detail}</Typography>
      </CardContent>
    </Card>
  );
}

export default MetricCard;
