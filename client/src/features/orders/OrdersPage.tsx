import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import type { Order } from '../../models/order';
import { formatDateTime, formatPrice } from '../../utils/format';
import OrderStatusChip from './OrderStatusChip';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    orderApi
      .list()
      .then((result) => active && setOrders(result))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, []);

  if (failed) return <Alert severity="error">Could not load your orders. Please try again later.</Alert>;

  if (!orders) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          No orders yet
        </Typography>
        <Button component={RouterLink} to="/catalog" variant="contained" sx={{ mt: 2 }}>
          Start shopping
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        My orders
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Placed</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <TableCell>#{order.id}</TableCell>
                <TableCell>{formatDateTime(order.orderDate)}</TableCell>
                <TableCell align="right">
                  {order.items.reduce((count, item) => count + item.quantity, 0)}
                </TableCell>
                <TableCell align="right">{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <OrderStatusChip status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
