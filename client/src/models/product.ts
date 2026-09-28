export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string | null;
  brand: string;
  type: string;
}

export interface NamedEntity {
  id: number;
  name: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export type SortField = 'name' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface ProductQuery {
  page: number;
  size: number;
  sort: SortField;
  order: SortOrder;
  brandId?: number;
  typeId?: number;
  keyword?: string;
}
