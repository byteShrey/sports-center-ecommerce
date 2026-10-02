import { useEffect } from 'react';
import { Container, LinearProgress } from '@mui/material';
import { Outlet, useNavigation } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { loadBasket } from '../../features/basket/basketSlice';
import { validateSession } from '../../features/account/accountSlice';
import Header from './Header';

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(loadBasket());
    dispatch(validateSession());
  }, [dispatch]);

  return (
    <>
      {navigation.state === 'loading' && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.appBar + 1 }}
        />
      )}
      <Header />
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
