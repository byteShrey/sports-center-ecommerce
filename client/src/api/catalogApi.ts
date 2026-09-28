import { http } from './http';
import type { NamedEntity, PageResponse, Product, ProductQuery } from '../models/product';

export const catalogApi = {
  listProducts: (query: ProductQuery) =>
    http.get<PageResponse<Product>>('/products', { params: query }).then((res) => res.data),

  getProduct: (id: number) => http.get<Product>(`/products/${id}`).then((res) => res.data),

  listBrands: () => http.get<NamedEntity[]>('/brands').then((res) => res.data),

  listTypes: () => http.get<NamedEntity[]>('/types').then((res) => res.data),
};
