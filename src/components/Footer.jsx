// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000',
        color: '#e0e0e0',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Floret Shine
            </Typography>
            <Typography variant="body2">
              Premium quality jewelry with timeless elegance.
            </Typography>
          </Grid>

          {/* Social Icons */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Floret Shine. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
