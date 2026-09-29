import { http } from './http';
import type { Basket } from '../models/basket';

export const basketApi = {
  get: (basketId: string) => http.get<Basket>(`/baskets/${basketId}`).then((res) => res.data),

  addItem: (basketId: string, productId: number, quantity: number) =>
    http.post<Basket>(`/baskets/${basketId}/items`, { productId, quantity }).then((res) => res.data),

  updateItem: (basketId: string, productId: number, quantity: number) =>
    http.put<Basket>(`/baskets/${basketId}/items/${productId}`, { quantity }).then((res) => res.data),

  removeItem: (basketId: string, productId: number) =>
    http.delete<Basket>(`/baskets/${basketId}/items/${productId}`).then((res) => res.data),
};
