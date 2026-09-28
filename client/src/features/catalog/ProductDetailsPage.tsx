import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { catalogApi } from '../../api/catalogApi';
import type { Product } from '../../models/product';
import { formatPrice } from '../../utils/format';
import NotFoundPage from '../errors/NotFoundPage';
import ProductImage from './ProductImage';

type PageStatus = 'loading' | 'ready' | 'notFound' | 'error';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Number(id);
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<PageStatus>('loading');

  useEffect(() => {
    if (!Number.isInteger(productId)) {
      setStatus('notFound');
      return;
    }

    let active = true;
    setStatus('loading');
    catalogApi
      .getProduct(productId)
      .then((result) => {
        if (!active) return;
        setProduct(result);
        setStatus('ready');
      })
      .catch((error) => {
        if (!active) return;
        const notFound = axios.isAxiosError(error) && error.response?.status === 404;
        setStatus(notFound ? 'notFound' : 'error');
      });

    return () => {
      active = false;
    };
  }, [productId]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'notFound') return <NotFoundPage />;

  if (status === 'error' || !product) {
    return <Alert severity="error">Could not load this product. Please try again later.</Alert>;
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Button component={RouterLink} to="/catalog" startIcon={<ArrowBackIcon />}>
          Back to catalog
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <ProductImage src={product.pictureUrl} alt={product.name} height={380} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <Chip label={product.brand} color="primary" variant="outlined" size="small" />
              <Chip label={product.type} variant="outlined" size="small" />
            </Stack>
            <Typography variant="h4" fontWeight={700}>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" fontWeight={700}>
              {formatPrice(product.price)}
            </Typography>
            <Divider />
            <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {product.description || 'No description available.'}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
