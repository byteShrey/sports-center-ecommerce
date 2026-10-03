import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { orderApi } from '../../api/orderApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { ShippingAddress } from '../../models/order';
import { apiErrorMessage, formatPrice } from '../../utils/format';
import BasketSummary from '../basket/BasketSummary';
import { clearBasket } from '../basket/basketSlice';

const emptyAddress: ShippingAddress = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
};

const fields: { key: keyof ShippingAddress; label: string; required: boolean; half?: boolean }[] = [
  { key: 'name', label: 'Full name', required: true },
  { key: 'address1', label: 'Address line 1', required: true },
  { key: 'address2', label: 'Address line 2 (optional)', required: false },
  { key: 'city', label: 'City', required: true, half: true },
  { key: 'state', label: 'State', required: true, half: true },
  { key: 'zipCode', label: 'PIN code', required: true, half: true },
  { key: 'country', label: 'Country', required: true, half: true },
];

type FieldErrors = Partial<Record<keyof ShippingAddress, string>>;

const validate = (address: ShippingAddress): FieldErrors =>
  Object.fromEntries(
    fields
      .filter((field) => field.required && !address[field.key].trim())
      .map((field) => [field.key, `${field.label} is required`]),
  );

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { basket, loaded } = useAppSelector((state) => state.basket);
  const [address, setAddress] = useState<ShippingAddress>(emptyAddress);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<number | null>(null);

  // Checked before the empty-basket guard: clearing the basket after a successful
  // order must not bounce the shopper to /basket while the order page loads.
  if (placedOrderId !== null) {
    return <Navigate to={`/orders/${placedOrderId}`} replace state={{ justPlaced: true }} />;
  }

  if (!loaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!basket || basket.items.length === 0) return <Navigate to="/basket" replace />;

  const handleChange = (key: keyof ShippingAddress) => (event: ChangeEvent<HTMLInputElement>) => {
    setAddress((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const fieldErrors = validate(address);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const order = await orderApi.create({ basketId: basket.id, shippingAddress: address });
      setPlacedOrderId(order.id);
      dispatch(clearBasket());
    } catch (error) {
      setSubmitError(apiErrorMessage(error, 'Could not place your order. Please try again.'));
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Checkout
      </Typography>

      <Grid container spacing={3} component="form" onSubmit={handleSubmit} noValidate>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Shipping address
            </Typography>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item key={field.key} xs={12} sm={field.half ? 6 : 12}>
                  <TextField
                    fullWidth
                    label={field.label}
                    required={field.required}
                    value={address[field.key]}
                    onChange={handleChange(field.key)}
                    error={Boolean(errors[field.key])}
                    helperText={errors[field.key]}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Items
              </Typography>
              <Stack spacing={1}>
                {basket.items.map((item) => (
                  <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {item.name} × {item.quantity}
                    </Typography>
                    <Typography variant="body2">{formatPrice(item.price * item.quantity)}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            <BasketSummary subtotal={basket.subtotal}>
              {submitError && <Alert severity="error">{submitError}</Alert>}
              <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting}>
                {submitting ? 'Placing order…' : 'Place order'}
              </Button>
            </BasketSummary>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
