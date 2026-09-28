import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { catalogApi } from '../../api/catalogApi';
import type { NamedEntity, PageResponse, Product, ProductQuery } from '../../models/product';
import type { RootState } from '../../app/store';

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface CatalogState {
  query: ProductQuery;
  products: Product[];
  totalPages: number;
  totalElements: number;
  status: LoadStatus;
  error: string | null;
  brands: NamedEntity[];
  types: NamedEntity[];
  filtersLoaded: boolean;
}

const initialQuery: ProductQuery = { page: 0, size: 12, sort: 'name', order: 'asc' };

const initialState: CatalogState = {
  query: initialQuery,
  products: [],
  totalPages: 0,
  totalElements: 0,
  status: 'idle',
  error: null,
  brands: [],
  types: [],
  filtersLoaded: false,
};

export const fetchProducts = createAsyncThunk<PageResponse<Product>, void, { state: RootState }>(
  'catalog/fetchProducts',
  (_, { getState }) => catalogApi.listProducts(getState().catalog.query),
);

export const fetchFilters = createAsyncThunk('catalog/fetchFilters', async () => {
  const [brands, types] = await Promise.all([catalogApi.listBrands(), catalogApi.listTypes()]);
  return { brands, types };
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Any filter change sends the user back to the first page unless a page is given explicitly.
    setQuery(state, action: PayloadAction<Partial<ProductQuery>>) {
      state.query = { ...state.query, ...action.payload, page: action.payload.page ?? 0 };
    },
    resetQuery(state) {
      state.query = initialQuery;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load products';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.brands = action.payload.brands;
        state.types = action.payload.types;
        state.filtersLoaded = true;
      });
  },
});

export const { setQuery, resetQuery } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;
