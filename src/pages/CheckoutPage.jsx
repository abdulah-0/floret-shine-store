// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import api from '../api/api.js';

export default function CheckoutPage() {
  const theme = useTheme();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Delivery fields
  const [country, setCountry]       = useState('Pakistan');
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [address, setAddress]       = useState('');
  const [city, setCity]             = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone]           = useState('');
  const [saveInfo, setSaveInfo]     = useState(false);

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paymentFile, setPaymentFile]     = useState(null);

  // UI state
  const [loading, setLoading]                   = useState(false);
  const [error, setError]                       = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Compute total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append(
        'items',
        JSON.stringify(
          cartItems.map(({ id, quantity }) => ({ id, quantity }))
        )
      );
      data.append('country', country);
      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('address', address);
      data.append('city', city);
      data.append('postalCode', postalCode);
      data.append('phone', phone);
      data.append('saveInfo', saveInfo);
      data.append('paymentMethod', paymentMethod);
      if (paymentFile) data.append('paymentPhoto', paymentFile);

      await api.post('/api/orders', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccessDialogOpen(true);
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    clearCart();
    setSuccessDialogOpen(false);
    navigate('/products');
  };

  if (cartItems.length === 0 && !successDialogOpen) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="#fff">
          Your cart is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      {/* Checkout Header */}
      <Typography variant="h4" gutterBottom color="#fff">
        Checkout
      </Typography>

      {/* Order Summary */}
      <Typography variant="h6" color="#fff" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartItems.map(item => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={<Typography color="#fff">{item.name} × {item.quantity}</Typography>}
              secondary={<Typography color="#fff">Rs. {(Number(item.price)*item.quantity).toFixed(2)}</Typography>}
            />
          </ListItem>
        ))}
        <Divider sx={{ borderColor: '#444' }} />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={<Typography color="#fff">Total</Typography>} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} color="#fff">
            Rs. {total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 3, borderColor: '#444' }} />

      {/* Delivery & Payment Form */}
      <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Delivery Fields */}
        <Typography variant="h6" gutterBottom color="#fff">
          Delivery
        </Typography>
        <Grid container spacing={2}>
          {/* Country */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#fff' }}>Country/Region</InputLabel>
              <Select
                value={country}
                label="Country/Region"
                onChange={e => setCountry(e.target.value)}
                sx={{ color: '#fff' }}
              >
                <MenuItem value="Pakistan">Pakistan</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Name Fields */}
          <Grid item xs={6}>
            <TextField
              label="First name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* City & Postal */}
          <Grid item xs={6}>
            <TextField
              label="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              required fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal code (optional)"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              label="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required fullWidth
              InputLabelProps={{ style: { color: '#fff' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>

          {/* Save Info */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={saveInfo}
                  onChange={e => setSaveInfo(e.target.checked)}
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': { color: '#fff' }
                  }}
                />
              }
              label={<Typography color="#fff">Save this information for next time</Typography>}
            />
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2, borderColor: '#444' }} />
            <Typography variant="h6" color="#fff">Payment Method</Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                label={<Typography color="#fff">Cash on Delivery</Typography>}
              />
              <FormControlLabel
                value="easypaisa"
                control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                label={<Typography color="#fff">Easypaisa</Typography>}
              />
              <FormControlLabel
                value="bank"
                control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                label={<Typography color="#fff">Bank Transfer</Typography>}
              />
            </RadioGroup>
          </Grid>

          {/* Upload Proof */}
          {(paymentMethod === 'easypaisa' || paymentMethod === 'bank') && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                sx={{ color: '#fff', borderColor: '#fff' }}
              >
                {paymentFile ? paymentFile.name : 'Upload Payment Photo'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={e => setPaymentFile(e.target.files[0] || null)}
                />
              </Button>
            </Grid>
          )}
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Place Order */}
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              '&:hover': { backgroundColor: theme.palette.grey[300] }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
          </Button>
        </Box>
      </Box>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleContinue}>
        <DialogTitle>
          <Typography color="#000">Order Successful</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="#000">
            Your order has been placed successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleContinue}
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': { backgroundColor: theme.palette.grey[800] }
            }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
