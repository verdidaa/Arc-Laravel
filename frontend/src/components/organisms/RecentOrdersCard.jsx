import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import StatusChip from '../atoms/StatusChip.jsx';

function RecentOrdersCard({ orders }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          Recent Orders
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Latest activity from your store
        </Typography>
        <List disablePadding>
          {orders.map((order, index) => (
            <Box key={order.id}>
              <ListItem disableGutters sx={{ py: 1.25 }}>
                <ListItemText
                  primary={`${order.id} - ${order.customer}`}
                  secondary={`Total ${order.total}`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <StatusChip label={order.state} />
              </ListItem>
              {index < orders.length - 1 ? <Divider /> : null}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default RecentOrdersCard;
