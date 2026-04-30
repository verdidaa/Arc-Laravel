import { Button } from '@mui/material';

function SecondaryButton({ children, onClick, type = 'button' }) {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant="outlined"
      sx={{ borderRadius: 3, textTransform: 'none' }}
    >
      {children}
    </Button>
  );
}

export default SecondaryButton;
