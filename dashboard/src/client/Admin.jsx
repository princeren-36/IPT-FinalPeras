import React, { useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';
import ManageUsers from '../admin/ManageUsers';
import ManageProducts from '../admin/ManageProducts';

import AdminSidebar from '../admin/AdminNavbar';
import axios from 'axios'
function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [products, setProducts] = useState([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', category: '', image: null });
  const [productSnackbar, setProductSnackbar] = useState('');

  const [users, setUsers] = useState([]);
  const [userSnackbar, setUserSnackbar] = useState('');

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        axios.get('https://kantokusina.vercel.app/products'),
        axios.get('https://kantokusina.vercel.app/user/all')
      ]).then(([productsResponse, usersResponse]) => {
        setProducts(productsResponse.data);
        setUsers(usersResponse.data);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }, [isLoggedIn]);

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleLogin = () => {
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsLoggedIn(true);
      setLoginDialogOpen(false);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Product CRUD logic
  const handleOpenProductDialog = (product = null) => {
    setEditingProduct(product);
    setProductForm(product ? { ...product, image: null } : { name: '', price: '', category: '', image: null });
    setProductDialogOpen(true);
  };
  const handleCloseProductDialog = () => setProductDialogOpen(false);
  const handleProductFormChange = (e) => {
    const { name, value, files } = e.target;
    setProductForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const handleProductSave = async () => {
    // Simulate API call
    setProductSnackbar(editingProduct ? 'Product updated!' : 'Product added!');
    setProductDialogOpen(false);
  };
  const handleProductDelete = (id) => {
    setProductSnackbar('Product deleted!');
  };

  // User management logic (demo only)
  const handleUserDelete = (id) => {
    setUserSnackbar('User deleted!');
  };

  // Add logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setLoginDialogOpen(true);
    setLoginForm({ username: '', password: '' });
    navigate('/login');
  };

  return (
    <>
      {isLoggedIn && (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: '#23263a' }}>
          <AdminSidebar tab={tab} onTabChange={setTab} onLogout={handleLogout} />
          <Box sx={{ flexGrow: 1, ml: { xs: 0, md: '220px' }, p: 3 }}>
            <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 } }}>
              <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, background: '#3a3f5c', color: '#fff', borderRadius: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: "#ffb347", fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
                  Admin Dashboard
                </Typography>
                <Box hidden={tab !== 0}>
                  <Dashboard />
                </Box>
                <Box hidden={tab !== 1}>
                  <ManageUsers
                    users={users}
                    onUserDelete={handleUserDelete}
                    userSnackbar={userSnackbar}
                    setUserSnackbar={setUserSnackbar}
                  />
                </Box>
                <Box hidden={tab !== 2}>
                  <ManageProducts
                    products={products}
                    onOpenProductDialog={handleOpenProductDialog}
                    onProductDelete={handleProductDelete}
                    productDialogOpen={productDialogOpen}
                    onCloseProductDialog={handleCloseProductDialog}
                    editingProduct={editingProduct}
                    productForm={productForm}
                    onProductFormChange={handleProductFormChange}
                    onProductSave={handleProductSave}
                    productSnackbar={productSnackbar}
                    setProductSnackbar={setProductSnackbar}
                  />
                </Box>
              </Paper>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Admin;