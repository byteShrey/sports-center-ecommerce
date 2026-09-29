const BASKET_ID_KEY = 'sports-center.basketId';

export const basketStorage = {
  get: () => localStorage.getItem(BASKET_ID_KEY),

  getOrCreate: () => {
    let basketId = localStorage.getItem(BASKET_ID_KEY);
    if (!basketId) {
      basketId = crypto.randomUUID();
      localStorage.setItem(BASKET_ID_KEY, basketId);
    }
    return basketId;
  },

  clear: () => localStorage.removeItem(BASKET_ID_KEY),
};
