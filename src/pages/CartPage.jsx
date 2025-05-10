// src/pages/CartPage.jsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api.js';

export default function CartPage() {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.map(item => {
        const imgSrc = item.imageUrl.startsWith('http')
          ? item.imageUrl
          : `${api.defaults.baseURL}${item.imageUrl}`;

        return (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Avatar
              variant="square"
              src={imgSrc}
              alt={item.name}
              sx={{ width: 64, height: 64 }}
            />

            <Box sx={{ flexGrow: 1, ml: 2 }}>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => addToCart(item, 1)}
                >
                  <AddIcon />
                </IconButton>
                <Typography sx={{ ml: 3, fontWeight: 600 }}>
                  Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <IconButton
              edge="end"
              color="error"
              onClick={() => removeFromCart(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">
          Total: Rs. {total.toFixed(2)}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 2 }}
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/checkout"
            sx={{ textTransform: 'none' }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
