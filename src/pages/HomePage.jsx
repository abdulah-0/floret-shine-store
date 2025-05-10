// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function HomePage() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Failed to load products:', err);
        setProducts([]);             // fallback to empty array
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Grid container spacing={4}>
        {(Array.isArray(products) ? products : []).map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
