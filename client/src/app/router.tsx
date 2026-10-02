import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from '../features/home/HomePage';
import RequireAuth from '../features/account/RequireAuth';
import NotFoundPage from '../features/errors/NotFoundPage';

const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', lazy: page(() => import('../features/catalog/CatalogPage')) },
      { path: 'catalog/:id', lazy: page(() => import('../features/catalog/ProductDetailsPage')) },
      { path: 'basket', lazy: page(() => import('../features/basket/BasketPage')) },
      { path: 'sign-in', lazy: page(() => import('../features/account/SignInPage')) },
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', lazy: page(() => import('../features/checkout/CheckoutPage')) },
          { path: 'orders', lazy: page(() => import('../features/orders/OrdersPage')) },
          { path: 'orders/:id', lazy: page(() => import('../features/orders/OrderDetailsPage')) },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
