const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => currency.format(amount);

export const resolveImageUrl = (path: string | null) => {
  if (!path) return null;
  return /^(https?:)?\/\//.test(path) || path.startsWith('/') ? path : `/${path}`;
};
