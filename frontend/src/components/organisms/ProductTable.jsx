import {
  Box,
  Card,
  CardContent,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import InfoBadge from '../atoms/InfoBadge.jsx';
import PrimaryButton from '../atoms/PrimaryButton.jsx';
import StatusChip from '../atoms/StatusChip.jsx';

function ProductTable({
  onAddProduct,
  currentPage = 1,
  onEditProduct,
  onPageChange,
  pageCount = 1,
  products,
  subtitle = 'Products visible to the logged-in admin user',
  title = 'Product List',
}) {
  const showActions = Boolean(onEditProduct);
  const showAddButton = Boolean(onAddProduct);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          sx={{ px: 3, py: 2.5 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <InfoBadge label={`${products.length} items`} />
            {showAddButton ? (
              <PrimaryButton onClick={onAddProduct}>Add Product</PrimaryButton>
            ) : null}
          </Stack>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              {showActions ? <TableCell align="right">Actions</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku} hover>
                <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <StatusChip label={product.status} />
                </TableCell>
                {showActions ? (
                  <TableCell align="right">
                    <IconButton
                      aria-label={`Edit ${product.name}`}
                      onClick={() => onEditProduct(product)}
                      size="small"
                      sx={{
                        border: '1px solid rgba(15, 23, 42, 0.12)',
                        borderRadius: 2,
                      }}
                    >
                      <Typography component="span" sx={{ fontSize: '0.9rem' }}>
                        Edit
                      </Typography>
                    </IconButton>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {pageCount > 1 ? (
          <Stack direction="row" justifyContent="flex-end" sx={{ px: 3, py: 2 }}>
            <Pagination
              color="primary"
              count={pageCount}
              onChange={onPageChange}
              page={currentPage}
            />
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default ProductTable;
