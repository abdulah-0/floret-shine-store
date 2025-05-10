// src/components/Collections.jsx
import React from 'react';
import { Box, Typography, Grid, CardActionArea, CardMedia } from '@mui/material';

const collections = [
  { name: 'Shades of Black', img:'/shades.jpg', href:'/shades' },
  // …
];

export default function Collections() {
  return (
    <Box sx={{ bgColor: '#111', p:4 }}>
      <Typography variant="h4" color="secondary" gutterBottom>
        Explore the Maison’s Collections
      </Typography>
      <Grid container spacing={2}>
        {collections.map(c => (
          <Grid item xs={6} md={3} key={c.name}>
            <CardActionArea href={c.href}>
              <CardMedia
                component="img"
                image={c.img}
                alt={c.name}
                sx={{ height: 180 }}
              />
              <Typography align="center" sx={{ mt:1 }}>{c.name}</Typography>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
