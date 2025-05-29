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
  const [formErrors, setFormErrors] = useState({});

  // Load products and cart from localStorage
  useEffect(() => {
    fetch("https://kantokusina.vercel.app/products")
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
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateProduct = () => {
    const errors = {};
    if (!newProduct.name.trim()) errors.name = 'Name is required.';
    if (!newProduct.price.trim()) {
      errors.price = 'Price is required.';
    } else if (isNaN(newProduct.price) || Number(newProduct.price) <= 0) {
      errors.price = 'Price must be a positive number.';
    }
    if (!newProduct.category.trim()) errors.category = 'Category is required.';
    return errors;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const errors = validateProduct();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch("https://kantokusina.vercel.app/products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMenuItems([...menuItems, data]);
    handleCloseAddDialog();
  };

  return (
    <div
      className="menu-page"
      style={{
        background: '#2d2d2d',
        minHeight: '100vh',
       
        display: 'flex',
        flexDirection: 'column',
       
       
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: "#ffb347",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            textAlign: "center"
          }}
        >
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
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
        >
          {menuItems.map((item, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item._id || idx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                my: { xs: 2, md: 0 }
              }}
            >
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
                  width: { xs: '100%', sm: '90%', md: 320 },
                  maxWidth: 350,
                  alignItems: 'center',
                  mx: 'auto',
                  transition: 'width 0.2s',
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    item.image
                      ? item.image.startsWith('http')
                        ? item.image
                        : `https://kantokusina.vercel.app${item.image}`
                      : ''
                  }
                  alt={item.name}
                  sx={{
                    width: '100%',
                    height: { xs: 160, sm: 180, md: 200 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    display: 'block',
                    maxWidth: '100%',
                    transition: 'height 0.2s',
                  }}
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
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!formErrors.price}
                helperText={formErrors.price}
              />
              <TextField
                margin="dense"
                label="Category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!formErrors.category}
                helperText={formErrors.category}
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
    </div>
  );
}

export default Menu;
