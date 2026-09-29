import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { BasketItem } from '../../models/basket';
import { formatPrice } from '../../utils/format';
import ProductImage from '../catalog/ProductImage';
import BasketSummary from './BasketSummary';
import { removeBasketItem, updateBasketItem } from './basketSlice';

function BasketLine({ item, disabled }: { item: BasketItem; disabled: boolean }) {
  const dispatch = useAppDispatch();
  const changeQuantity = (quantity: number) =>
    dispatch(updateBasketItem({ productId: item.productId, quantity }));

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <ProductImage src={item.pictureUrl} alt={item.name} height={72} />
        </Grid>
        <Grid item xs={9} sm={5}>
          <Link component={RouterLink} to={`/catalog/${item.productId}`} underline="hover" color="inherit">
            <Typography fontWeight={600}>{item.name}</Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {item.brand} · {formatPrice(item.price)} each
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton
              size="small"
              aria-label="decrease quantity"
              disabled={disabled || item.quantity <= 1}
              onClick={() => changeQuantity(item.quantity - 1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</Typography>
            <IconButton
              size="small"
              aria-label="increase quantity"
              disabled={disabled}
              onClick={() => changeQuantity(item.quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
            <Typography fontWeight={700}>{formatPrice(item.price * item.quantity)}</Typography>
            <IconButton
              size="small"
              aria-label={`remove ${item.name}`}
              disabled={disabled}
              onClick={() => dispatch(removeBasketItem(item.productId))}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function BasketPage() {
  const { basket, loaded, updating, error } = useAppSelector((state) => state.basket);

  if (!loaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!basket || basket.items.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Your basket is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Find something you like in the catalog.
        </Typography>
        <Button component={RouterLink} to="/catalog" variant="contained">
          Browse the catalog
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Your basket
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={1.5}>
            {basket.items.map((item) => (
              <BasketLine key={item.productId} item={item} disabled={updating} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <BasketSummary subtotal={basket.subtotal}>
            <Button component={RouterLink} to="/checkout" variant="contained" size="large" fullWidth>
              Checkout
            </Button>
          </BasketSummary>
        </Grid>
      </Grid>
    </Stack>
  );
}
