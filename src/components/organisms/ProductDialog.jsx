import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import PrimaryButton from '../atoms/PrimaryButton.jsx';

const statusOptions = ['Active', 'Low Stock', 'Out of Stock'];

function ProductDialog({
  onClose,
  onFieldChange,
  onSubmit,
  open,
  product,
  submitLabel,
  title,
}) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            onChange={onFieldChange}
            value={product.name}
          />
          <TextField
            fullWidth
            label="SKU"
            name="sku"
            onChange={onFieldChange}
            value={product.sku}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            onChange={onFieldChange}
            value={product.category}
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            onChange={onFieldChange}
            type="number"
            value={product.stock}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            onChange={onFieldChange}
            placeholder="129.00"
            value={product.price}
          />
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            onChange={onFieldChange}
            value={product.status}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <PrimaryButton onClick={onClose}>Cancel</PrimaryButton>
        <PrimaryButton onClick={onSubmit}>{submitLabel}</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDialog;
