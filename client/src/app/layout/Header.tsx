import { AppBar, Badge, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectBasketCount } from '../../features/basket/basketSlice';
import { signOut } from '../../features/account/accountSlice';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/catalog' },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const basketCount = useAppSelector(selectBasketCount);
  const user = useAppSelector((state) => state.account.user);

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

          <Box component="nav" sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
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

          <IconButton component={RouterLink} to="/basket" color="inherit" aria-label="basket">
            <Badge badgeContent={basketCount} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Hi, {user.username}
              </Typography>
              <Button component={NavLink} to="/orders" color="inherit" size="small">
                My orders
              </Button>
              <Button color="inherit" variant="outlined" size="small" onClick={() => dispatch(signOut())}>
                Sign out
              </Button>
            </Box>
          ) : (
            <Button component={RouterLink} to="/sign-in" color="inherit" variant="outlined" size="small">
              Sign in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
