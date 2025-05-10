// src/components/Hero.jsx
import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

export default function Hero() {
  return (
    <Box
      sx={{
        height: '70vh',
        background: 'url(/hero.jpg) center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom>Ready to Wear</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" href="/men">Men</Button>
        <Button variant="outlined" href="/women">Women</Button>
      </Stack>
    </Box>
  );
}
