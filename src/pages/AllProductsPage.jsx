// src/pages/AllProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/api/products')
      .then(res => {
        // only keep items in stock
        const inStock = res.data.filter(p => p.stockQuantity > 0);
        setProducts(inStock);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setProducts([]);
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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" gutterBottom>
        All Products In Stock
      </Typography>

      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
