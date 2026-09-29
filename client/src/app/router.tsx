import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from '../features/home/HomePage';
import CatalogPage from '../features/catalog/CatalogPage';
import ProductDetailsPage from '../features/catalog/ProductDetailsPage';
import BasketPage from '../features/basket/BasketPage';
import SignInPage from '../features/account/SignInPage';
import RequireAuth from '../features/account/RequireAuth';
import CheckoutPage from '../features/checkout/CheckoutPage';
import OrdersPage from '../features/orders/OrdersPage';
import OrderDetailsPage from '../features/orders/OrderDetailsPage';
import NotFoundPage from '../features/errors/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:id', element: <ProductDetailsPage /> },
      { path: 'basket', element: <BasketPage /> },
      { path: 'sign-in', element: <SignInPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'orders/:id', element: <OrderDetailsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
