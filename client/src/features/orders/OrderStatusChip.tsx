import { Chip, type ChipProps } from '@mui/material';
import type { OrderStatus } from '../../models/order';

const statusDisplay: Record<OrderStatus, { label: string; color: ChipProps['color'] }> = {
  PENDING: { label: 'Pending', color: 'warning' },
  PAYMENT_RECEIVED: { label: 'Paid', color: 'success' },
  PAYMENT_FAILED: { label: 'Payment failed', color: 'error' },
};

export default function OrderStatusChip({ status }: { status: OrderStatus }) {
  const { label, color } = statusDisplay[status];
  return <Chip label={label} color={color} size="small" variant="outlined" />;
}
