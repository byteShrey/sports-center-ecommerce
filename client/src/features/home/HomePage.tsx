import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <Typography variant="overline" color="secondary" fontWeight={700}>
        Gear up for game day
      </Typography>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Everything you need to play your best
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 4 }}>
        Shoes, rackets, footballs and kit bags from the brands athletes trust.
      </Typography>
      <Button component={RouterLink} to="/catalog" variant="contained" size="large">
        Browse the catalog
      </Button>
    </Box>
  );
}
