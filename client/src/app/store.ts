import { configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';
import { catalogReducer } from '../features/catalog/catalogSlice';
import { basketReducer } from '../features/basket/basketSlice';
import { accountReducer } from '../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    basket: basketReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>;
