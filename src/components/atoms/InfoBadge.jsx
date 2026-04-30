import { Chip } from '@mui/material';

function InfoBadge({ label, sx }) {
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
        ...sx,
      }}
    />
  );
}

export default InfoBadge;
