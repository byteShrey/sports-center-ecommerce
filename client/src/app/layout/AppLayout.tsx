import { useEffect } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { loadBasket } from '../../features/basket/basketSlice';
import { validateSession } from '../../features/account/accountSlice';
import Header from './Header';

export default function AppLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBasket());
    dispatch(validateSession());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
