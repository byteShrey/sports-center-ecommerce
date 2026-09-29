export const FREE_DELIVERY_THRESHOLD = 5000;
export const STANDARD_DELIVERY_FEE = 150;

export const deliveryFeeFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
