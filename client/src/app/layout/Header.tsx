import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import { NavLink, Link as RouterLink } from 'react-router-dom';

const navItems = [{ label: 'Home', to: '/' }];

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 3 }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            <SportsBasketballIcon />
            Sports Center
          </Typography>

          <Box component="nav" sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === '/'}
                color="inherit"
                sx={{ opacity: 0.75, '&.active': { opacity: 1, fontWeight: 700 } }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
