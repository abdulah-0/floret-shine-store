// src/components/ProductCard.jsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@mui/material';
import { useCart } from '../context/CartContext.jsx';
import api from '../api/api.js';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Ensure price is treated as a number
  const price = parseFloat(product.price) || 0;

  // Determine which image to show:
  // - If there's a valid URL, use it
  // - Otherwise fall back to placeholder
  const rawUrl = product.imageUrl ?? '/placeholder.png';
  const imageSrc = rawUrl.startsWith('http')
    ? rawUrl
    : `${api.defaults.baseURL}${rawUrl}`;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageSrc}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Rs. {price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
