import { Box } from '@mui/material';
import MetricCard from '../molecules/MetricCard.jsx';

function StatsGrid({ stats }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2,
        mb: 3,
      }}
    >
      {stats.map((stat) => (
        <MetricCard key={stat.label} {...stat} />
      ))}
    </Box>
  );
}

export default StatsGrid;
