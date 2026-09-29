import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from '../features/home/HomePage';
import CatalogPage from '../features/catalog/CatalogPage';
import ProductDetailsPage from '../features/catalog/ProductDetailsPage';
import BasketPage from '../features/basket/BasketPage';
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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
