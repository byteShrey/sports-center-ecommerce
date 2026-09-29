import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { basketApi } from '../../api/basketApi';
import type { Basket } from '../../models/basket';
import type { AppThunk, RootState } from '../../app/store';
import { basketStorage } from '../../utils/basketStorage';

interface BasketState {
  basket: Basket | null;
  loaded: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: BasketState = {
  basket: null,
  loaded: false,
  updating: false,
  error: null,
};

interface ItemChange {
  productId: number;
  quantity: number;
}

const requireBasketId = () => {
  const basketId = basketStorage.get();
  if (!basketId) throw new Error('There is no basket yet');
  return basketId;
};

export const loadBasket = createAsyncThunk('basket/load', async () => {
  const basketId = basketStorage.get();
  if (!basketId) return null;
  try {
    return await basketApi.get(basketId);
  } catch (error) {
    // Redis may have dropped the basket; start fresh instead of failing forever.
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      basketStorage.clear();
      return null;
    }
    throw error;
  }
});

export const addBasketItem = createAsyncThunk('basket/addItem', ({ productId, quantity }: ItemChange) =>
  basketApi.addItem(basketStorage.getOrCreate(), productId, quantity),
);

export const updateBasketItem = createAsyncThunk('basket/updateItem', ({ productId, quantity }: ItemChange) =>
  basketApi.updateItem(requireBasketId(), productId, quantity),
);

export const removeBasketItem = createAsyncThunk('basket/removeItem', (productId: number) =>
  basketApi.removeItem(requireBasketId(), productId),
);

const basketMutations = [addBasketItem, updateBasketItem, removeBasketItem] as const;

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    basketCleared(state) {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.loaded = true;
      })
      .addCase(loadBasket.rejected, (state, action) => {
        state.loaded = true;
        state.error = action.error.message ?? 'Failed to load basket';
      })
      .addMatcher(isPending(...basketMutations), (state) => {
        state.updating = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(...basketMutations), (state, action) => {
        state.updating = false;
        state.basket = action.payload;
      })
      .addMatcher(isRejected(...basketMutations), (state, action) => {
        state.updating = false;
        state.error = action.error.message ?? 'Basket update failed';
      });
  },
});

const { basketCleared } = basketSlice.actions;

export const clearBasket = (): AppThunk => (dispatch) => {
  basketStorage.clear();
  dispatch(basketCleared());
};

export const selectBasketCount = (state: RootState) => state.basket.basket?.itemCount ?? 0;

export const basketReducer = basketSlice.reducer;
