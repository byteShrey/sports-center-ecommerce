import { useState } from 'react';
import { Box } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { resolveImageUrl } from '../../utils/format';

interface ProductImageProps {
  src: string | null;
  alt: string;
  height: number | string;
}

export default function ProductImage({ src, alt, height }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const url = resolveImageUrl(src);

  if (!url || failed) {
    return (
      <Box
        role="img"
        aria-label={alt}
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.100',
          color: 'grey.400',
        }}
      >
        <SportsTennisIcon sx={{ fontSize: 56 }} />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={url}
      alt={alt}
      onError={() => setFailed(true)}
      sx={{ height, width: '100%', objectFit: 'contain', bgcolor: 'common.white', p: 2 }}
    />
  );
}
