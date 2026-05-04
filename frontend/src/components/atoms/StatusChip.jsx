import { Chip } from '@mui/material';

function getStatusStyles(status) {
  if (status === 'Active' || status === 'Paid') {
    return { backgroundColor: '#dcfce7', color: '#166534' };
  }

  if (status === 'Low Stock' || status === 'Packed' || status === 'Processing') {
    return { backgroundColor: '#fef3c7', color: '#92400e' };
  }

  return { backgroundColor: '#fee2e2', color: '#991b1b' };
}

function StatusChip({ label, size = 'small' }) {
  return <Chip label={label} size={size} sx={getStatusStyles(label)} />;
}

export default StatusChip;
