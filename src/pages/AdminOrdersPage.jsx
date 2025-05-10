// src/pages/AdminOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api.js';

export default function AdminOrdersPage() {
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [snackbar, setSnackbar] = useState({ open:false, msg:'', sev:'success' });

  // Fetch all orders
  const fetchOrders = () => {
    setLoading(true);
    api.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(() => {
        setSnackbar({ open:true, msg:'Failed to load orders', sev:'error' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchOrders, []);

  // Update status
  const handleStatus = (id, newStatus) => {
    api.patch(`/api/orders/${id}/status`, { status: newStatus })
      .then(res => {
        setOrders(o =>
          o.map(x => x.id === id ? { ...x, status: res.data.status } : x)
        );
        setSnackbar({ open:true, msg:'Status updated', sev:'success' });
      })
      .catch(() => {
        setSnackbar({ open:true, msg:'Update failed', sev:'error' });
      });
  };

  // Delete an order
  const handleDelete = id => {
    if (!window.confirm('Delete this order?')) return;
    api.delete(`/api/orders/${id}`)
      .then(() => {
        setOrders(o => o.filter(x => x.id !== id));
        setSnackbar({ open:true, msg:'Order deleted', sev:'info' });
      })
      .catch(() => {
        setSnackbar({ open:true, msg:'Delete failed', sev:'error' });
      });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign:'center', mt:8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p:4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Placed At</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.firstName} {o.lastName}</TableCell>

              {/* Coerce amountPaid to a number before formatting */}
              <TableCell>
                ${Number(o.amountPaid).toFixed(2)}
              </TableCell>

              <TableCell>
                <Select
                  value={o.status}
                  onChange={e => handleStatus(o.id, e.target.value)}
                  size="small"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                </Select>
              </TableCell>

              <TableCell>
                {new Date(o.createdAt).toLocaleString()}
              </TableCell>

              <TableCell align="center">
                {/* Delete button */}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(o.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open:false }))}
      >
        <Alert severity={snackbar.sev}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
