// src/pages/AdminProductsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import api from '../api/api.js';

export default function AdminProductsPage() {
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [dialogOpen,  setDialogOpen]  = useState(false);
  const [formData,    setFormData]    = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: '',
    imageFile: null,
    imageUrl: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showMessage = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };
  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  const fetchProducts = () => {
    setLoading(true);
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error(err);
        showMessage('Failed to load products', 'error');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchProducts, []);

  const openDialog = (product = null) => {
    if (product) {
      setFormData({
        id:            product.id,
        name:          product.name,
        description:   product.description,
        price:         product.price,
        stockQuantity: product.stockQuantity,
        category:      product.category,
        imageFile:     null,
        imageUrl:      product.imageUrl
      });
    } else {
      setFormData({
        id: null,
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageFile: null,
        imageUrl: ''
      });
    }
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };
  const handleFileChange = e => {
    const file = e.target.files[0] || null;
    setFormData(fd => ({ ...fd, imageFile: file }));
  };

  const handleSubmit = async () => {
    const { id, name, description, price, stockQuantity, category, imageFile } = formData;
    const data = new FormData();
    data.append('name',          name);
    data.append('description',   description);
    data.append('price',         price);
    data.append('stockQuantity', stockQuantity);
    data.append('category',      category);
    if (imageFile) data.append('image', imageFile);

    try {
      if (id) {
        await api.put(`/api/products/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showMessage('Product updated', 'success');
      } else {
        await api.post('/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showMessage('Product added', 'success');
      }
      closeDialog();
      fetchProducts();
    } catch (err) {
      console.error(err);
      showMessage('Operation failed', 'error');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      showMessage('Product deleted', 'info');
      fetchProducts();
    } catch (err) {
      console.error(err);
      showMessage('Delete failed', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => openDialog()}
        sx={{ mb: 2 }}
      >
        Add New Product
      </Button>

      <Table>
        <TableHead sx={{ backgroundColor: '#333' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.description}</TableCell>
              {/* ─── UPDATED LINE: coerce to number ─── */}
              <TableCell>
                ${parseFloat(p.price).toFixed(2)}
              </TableCell>
              <TableCell>{p.stockQuantity}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>
                {p.imageUrl ? (
                  <img
                    src={api.defaults.baseURL + p.imageUrl}
                    alt={p.name}
                    style={{ height: 40 }}
                  />
                ) : '—'}
              </TableCell>
              <TableCell>
                <Button size="small" onClick={() => openDialog(p)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {formData.id ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="outlined" component="label">
            {formData.imageFile ? formData.imageFile.name : 'Choose Image…'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {(formData.imageFile || formData.imageUrl) && (
            <Box
              component="img"
              src={
                formData.imageFile
                  ? URL.createObjectURL(formData.imageFile)
                  : api.defaults.baseURL + formData.imageUrl
              }
              alt=""
              sx={{ height: 100, mt: 1 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {formData.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
