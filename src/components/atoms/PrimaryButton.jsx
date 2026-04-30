import { Button } from '@mui/material';

function PrimaryButton({ children, onClick, type = 'button' }) {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant="contained"
      sx={{
        borderRadius: 3,
        textTransform: 'none',
        backgroundColor: '#1d4ed8',
      }}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
