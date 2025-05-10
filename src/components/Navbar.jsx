// src/components/Navbar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon          from '@mui/icons-material/Menu';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { cartItems = [] } = useCart();
  const { user, logout }   = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();

  // full nav links (used in top bar)
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Jewelry', path: '/jewelry' },
    { title: 'All Products', path: '/products' },
    { title: 'Cart', path: '/cart' },
    { title: 'Checkout', path: '/checkout' },
  ];

  // admin-only links
  const adminLinks = user?.role === 'admin'
    ? [
        { title: 'Manage Products', path: '/admin/products' },
        { title: 'Manage Orders', path: '/admin/orders' }
      ]
    : [];

  // login/register or logout
  const authLinks = user
    ? [{ title: 'Logout', action: logout }]
    : [
        { title: 'Login', path: '/login' },
        { title: 'Register', path: '/register' }
      ];

  // DRAWER links: remove Cart, Checkout, Logout
  const drawerLinks = [
    // keep everything except Cart & Checkout
    ...navLinks.filter(link => !['Cart', 'Checkout'].includes(link.title)),
    // admin pages
    ...adminLinks,
    // for guests: Login/Register; for logged-in: we drop Logout
    ...authLinks.filter(link => link.title !== 'Logout')
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* hamburger */}
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          {/* logo */}
          <Box component={Link} to="/" sx={{ mx: 'auto' }}>
            <Box component="img" src={logo} alt="Floret Shine" sx={{ height: 60 }} />
          </Box>

          {/* cart icon + logout/login */}
          <Box>
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {user ? (
              <Button color="inherit" onClick={logout} sx={{ textTransform: 'none' }}>
                Logout
              </Button>
            ) : (
              <IconButton component={Link} to="/login" color="inherit">
                <AccountCircleIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* secondary nav for top-level Home / Jewelry */}
        <Toolbar variant="dense" sx={{ justifyContent: 'center', gap: 2 }}>
          {navLinks.slice(0, 2).map(link => (
            <Button
              key={link.title}
              component={Link}
              to={link.path}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderBottom: location.pathname === link.path ? '2px solid #fff' : 'none'
              }}
            >
              {link.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer open={drawerOpen} anchor="left" onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {drawerLinks.map(link => (
              <ListItem key={link.title} disablePadding>
                {link.path ? (
                  <ListItemButton component={Link} to={link.path}>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                ) : (
                  <ListItemButton onClick={link.action}>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}
