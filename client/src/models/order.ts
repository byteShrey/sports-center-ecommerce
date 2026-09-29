export interface ShippingAddress {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'PENDING' | 'PAYMENT_RECEIVED' | 'PAYMENT_FAILED';

export interface OrderItem {
  productId: number;
  name: string;
  pictureUrl: string | null;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  basketId: string;
  buyerUsername: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  items: OrderItem[];
  subTotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
}

export interface CreateOrderRequest {
  basketId: string;
  shippingAddress: ShippingAddress;
  deliveryFee: number;
}
