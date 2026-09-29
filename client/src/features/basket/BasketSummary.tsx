import type { ReactNode } from 'react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { formatPrice } from '../../utils/format';
import { FREE_DELIVERY_THRESHOLD, deliveryFeeFor } from '../../utils/pricing';

interface BasketSummaryProps {
  subtotal: number;
  children?: ReactNode;
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography fontWeight={bold ? 700 : 400}>{label}</Typography>
      <Typography fontWeight={bold ? 700 : 400}>{value}</Typography>
    </Box>
  );
}

export default function BasketSummary({ subtotal, children }: BasketSummaryProps) {
  const deliveryFee = deliveryFeeFor(subtotal);
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <Paper variant="outlined" sx={{ p: 2.5 }}>
      <Stack spacing={1.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Order summary
        </Typography>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Delivery" value={deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)} />
        {deliveryFee > 0 && (
          <Typography variant="body2" color="text.secondary">
            Add {formatPrice(amountToFreeDelivery)} more for free delivery.
          </Typography>
        )}
        <Divider />
        <SummaryRow label="Total" value={formatPrice(subtotal + deliveryFee)} bold />
        {children}
      </Stack>
    </Paper>
  );
}
