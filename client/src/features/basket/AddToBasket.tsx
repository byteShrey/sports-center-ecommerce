import { useState } from 'react';
import { Button, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addBasketItem } from './basketSlice';

const MAX_QUANTITY = 10;

export default function AddToBasket({ productId }: { productId: number }) {
  const dispatch = useAppDispatch();
  const { basket, updating } = useAppSelector((state) => state.basket);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const inBasket = basket?.items.find((item) => item.productId === productId)?.quantity ?? 0;

  const handleAdd = async () => {
    const result = await dispatch(addBasketItem({ productId, quantity }));
    setMessage(
      addBasketItem.fulfilled.match(result)
        ? 'Added to basket'
        : 'Could not add to basket. Is the API running?',
    );
    if (addBasketItem.fulfilled.match(result)) setQuantity(1);
  };

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton
            aria-label="decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Typography>
          <IconButton
            aria-label="increase quantity"
            disabled={quantity >= MAX_QUANTITY}
            onClick={() => setQuantity((q) => q + 1)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddShoppingCartIcon />}
          disabled={updating}
          onClick={handleAdd}
        >
          Add to basket
        </Button>
      </Stack>

      {inBasket > 0 && (
        <Typography variant="body2" color="text.secondary">
          {inBasket} already in your basket
        </Typography>
      )}

      <Snackbar
        open={message !== null}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
        message={message}
        action={
          <Button component={RouterLink} to="/basket" color="secondary" size="small">
            View basket
          </Button>
        }
      />
    </Stack>
  );
}
