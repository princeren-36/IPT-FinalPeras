import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, Button,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from '@mui/material';
import '../styles/Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: '' });
  const [imageFile, setImageFile] = useState(null);

  // Load products and cart from localStorage
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(() => setMenuItems([]));

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (item) => {
    const existing = cart.find(ci => ci.id === item._id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(ci =>
        ci.id === item._id ? { ...ci, qty: ci.qty + 1 } : ci
      );
    } else {
      updatedCart = [...cart, { id: item._id, qty: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // persist cart
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // Add Product Dialog Handlers
  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setNewProduct({ name: '', price: '', image: '', category: '' });
    setImageFile(null);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMenuItems([...menuItems, data]);
    handleCloseAddDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{
        color: "#ffb347",
        fontWeight: "bold",
        fontSize: { xs: "1.5rem", md: "2.5rem" }
      }}>
        Menu
      </Typography>
      <Button
        variant="contained"
        color="warning"
        sx={{ mb: 3, borderRadius: 2, fontWeight: "bold" }}
        onClick={handleOpenAddDialog}
      >
        Add Product
      </Button>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {menuItems.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
            <Card
              className="menu-card"
              sx={{
                background: '#355c60',
                color: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  item.image
                    ? item.image.startsWith('http')
                      ? item.image
                      : `http://localhost:5000${item.image}`
                    : ''
                }
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" }, fontWeight: "bold" }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{item.category}</Typography>
                <Typography variant="subtitle1" color="#ffb347">{item.price}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ borderRadius: 0, fontWeight: "bold" }}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added to cart!
        </Alert>
      </Snackbar>

      {/* Add Product Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddProduct} id="add-product-form">
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, mb: 1 }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {imageFile && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {imageFile.name}
              </Typography>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button type="submit" form="add-product-form" variant="contained" color="warning">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Menu;
