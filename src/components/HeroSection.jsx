// src/components/HeroSection.jsx
import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bannerImg from '../assets/banner.png'; // your renamed image

export default function HeroSection() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 500 },
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Centered content */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#fff',
          px: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            mb: 2,
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Jewelry Essentials
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: 'common.black',
            color: '#fff',
            '&:hover': {
              bgcolor: theme.palette.grey[700],
            },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}
