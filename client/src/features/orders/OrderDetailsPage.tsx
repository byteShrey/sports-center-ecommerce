import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import type { Order } from '../../models/order';
import { formatDateTime, formatPrice } from '../../utils/format';
import NotFoundPage from '../errors/NotFoundPage';
import ProductImage from '../catalog/ProductImage';
import OrderStatusChip from './OrderStatusChip';

type PageStatus = 'loading' | 'ready' | 'notFound' | 'error';

function TotalRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography fontWeight={bold ? 700 : 400}>{label}</Typography>
      <Typography fontWeight={bold ? 700 : 400}>{value}</Typography>
    </Box>
  );
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orderId = Number(id);
  const location = useLocation();
  const justPlaced = Boolean((location.state as { justPlaced?: boolean } | null)?.justPlaced);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<PageStatus>('loading');

  useEffect(() => {
    if (!Number.isInteger(orderId)) {
      setStatus('notFound');
      return;
    }

    let active = true;
    setStatus('loading');
    orderApi
      .get(orderId)
      .then((result) => {
        if (!active) return;
        setOrder(result);
        setStatus('ready');
      })
      .catch((error) => {
        if (!active) return;
        const notFound = axios.isAxiosError(error) && error.response?.status === 404;
        setStatus(notFound ? 'notFound' : 'error');
      });

    return () => {
      active = false;
    };
  }, [orderId]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'notFound') return <NotFoundPage />;

  if (status === 'error' || !order) {
    return <Alert severity="error">Could not load this order. Please try again later.</Alert>;
  }

  const { shippingAddress: address } = order;

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/orders" startIcon={<ArrowBackIcon />}>
          All orders
        </Button>
      </Box>

      {justPlaced && (
        <Alert severity="success">Thanks for your order! We have received order #{order.id}.</Alert>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Order #{order.id}
        </Typography>
        <OrderStatusChip status={order.status} />
      </Stack>
      <Typography color="text.secondary">Placed {formatDateTime(order.orderDate)}</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Stack spacing={2} divider={<Divider flexItem />}>
              {order.items.map((item) => (
                <Grid container key={item.productId} spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <ProductImage src={item.pictureUrl} alt={item.name} height={64} />
                  </Grid>
                  <Grid item xs={6} sm={7}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quantity} × {formatPrice(item.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ textAlign: 'right' }}>
                    <Typography fontWeight={700}>{formatPrice(item.lineTotal)}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Shipping to
              </Typography>
              <Typography>{address.name}</Typography>
              <Typography color="text.secondary">{address.address1}</Typography>
              {address.address2 && <Typography color="text.secondary">{address.address2}</Typography>}
              <Typography color="text.secondary">
                {address.city}, {address.state} {address.zipCode}
              </Typography>
              <Typography color="text.secondary">{address.country}</Typography>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Stack spacing={1.5}>
                <TotalRow label="Subtotal" value={formatPrice(order.subTotal)} />
                <TotalRow
                  label="Delivery"
                  value={order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
                />
                <Divider />
                <TotalRow label="Total" value={formatPrice(order.total)} bold />
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
