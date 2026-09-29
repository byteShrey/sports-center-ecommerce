export interface BasketItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string | null;
  brand: string;
  type: string;
  quantity: number;
}

export interface Basket {
  id: string;
  items: BasketItem[];
  itemCount: number;
  subtotal: number;
}
