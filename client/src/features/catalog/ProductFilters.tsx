import { useState, type FormEvent } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { SortField, SortOrder } from '../../models/product';
import { resetQuery, setQuery } from './catalogSlice';

const sortOptions: { value: `${SortField}-${SortOrder}`; label: string }[] = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
];

const toOptionalId = (value: string) => (value ? Number(value) : undefined);

export default function ProductFilters() {
  const dispatch = useAppDispatch();
  const { query, brands, types } = useAppSelector((state) => state.catalog);
  const [keyword, setKeyword] = useState(query.keyword ?? '');

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    dispatch(setQuery({ keyword: keyword.trim() || undefined }));
  };

  const handleReset = () => {
    setKeyword('');
    dispatch(resetQuery());
  };

  return (
    <Paper variant="outlined" sx={{ p: 2.5, position: { md: 'sticky' }, top: { md: 88 } }}>
      <Stack spacing={2.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Filters
        </Typography>

        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            size="small"
            label="Search products"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>

        <FormControl fullWidth size="small">
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort by"
            value={`${query.sort}-${query.order}`}
            onChange={(event) => {
              const [sort, order] = event.target.value.split('-') as [SortField, SortOrder];
              dispatch(setQuery({ sort, order }));
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            label="Brand"
            value={query.brandId?.toString() ?? ''}
            onChange={(event) => dispatch(setQuery({ brandId: toOptionalId(event.target.value) }))}
          >
            <MenuItem value="">All brands</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            label="Type"
            value={query.typeId?.toString() ?? ''}
            onChange={(event) => dispatch(setQuery({ typeId: toOptionalId(event.target.value) }))}
          >
            <MenuItem value="">All types</MenuItem>
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id.toString()}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="text" onClick={handleReset}>
          Reset filters
        </Button>
      </Stack>
    </Paper>
  );
}
