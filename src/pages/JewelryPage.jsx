// src/pages/JewelryPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

const sections = [
  { key: 'pendants',  title: 'PENDANTS'  },
  { key: 'bracelets', title: 'BRACELETS' },
  { key: 'rings',     title: 'RINGS'     },
  { key: 'bundles',   title: 'BUNDLES'   },
];

export default function JewelryPage() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Failed loading jewelry:', err);
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
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: theme.palette.grey[900],
        color: '#fff',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 10 }
      }}
    >
      {sections.map(section => {
        const items = products.filter(p => p.category === section.key);
        if (!items.length) return null;

        return (
          <Box key={section.key} sx={{ mb: { xs: 6, md: 12 } }}>
            {/* Section Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '2px solid',
                display: 'inline-block',
                mb: { xs: 2, md: 4 },
                pb: 1
              }}
            >
              {section.title}
            </Typography>

            {/* Product Grid */}
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {items.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>

            {/* “View All” button like BLVCK has */}
            <Box textAlign="center" sx={{ mt: { xs: 3, md: 6 } }}>
              <Button
                component={Link}
                to={`/products?category=${section.key}`}
                variant="outlined"
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                View all {section.title.toLowerCase()}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
