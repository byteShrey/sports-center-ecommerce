import { http } from './http';
import type { CreateOrderRequest, Order } from '../models/order';

export const orderApi = {
  create: (request: CreateOrderRequest) => http.post<Order>('/orders', request).then((res) => res.data),

  list: () => http.get<Order[]>('/orders').then((res) => res.data),

  get: (orderId: number) => http.get<Order>(`/orders/${orderId}`).then((res) => res.data),
};
