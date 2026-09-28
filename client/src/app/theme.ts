import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#0f4c81' },
    secondary: { main: '#ff6f3c' },
    background: { default: '#f5f7fa' },
  },
  shape: { borderRadius: 10 },
  typography: {
    button: { textTransform: 'none', fontWeight: 600 },
  },
});
