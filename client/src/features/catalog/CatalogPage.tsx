import { useEffect } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFilters, fetchProducts, setQuery } from './catalogSlice';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { products, status, error, query, totalPages, totalElements, filtersLoaded } =
    useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, query]);

  const isFirstLoad = status === 'loading' && products.length === 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ProductFilters />
      </Grid>

      <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            Catalog
          </Typography>
          {status === 'succeeded' && (
            <Typography color="text.secondary">
              {totalElements} {totalElements === 1 ? 'product' : 'products'}
            </Typography>
          )}
        </Box>

        {status === 'loading' && !isFirstLoad && <LinearProgress sx={{ mb: 2 }} />}

        {isFirstLoad && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        )}

        {status === 'failed' && (
          <Alert severity="error">
            Could not load products. Make sure the API is running on port 8081. ({error})
          </Alert>
        )}

        {status === 'succeeded' && products.length === 0 && (
          <Alert severity="info">No products match these filters.</Alert>
        )}

        {products.length > 0 && status !== 'failed' && (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              color="primary"
              count={totalPages}
              page={query.page + 1}
              onChange={(_, page) => dispatch(setQuery({ page: page - 1 }))}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
