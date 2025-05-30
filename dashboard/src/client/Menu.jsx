import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import '../styles/Menu.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch("https://kantokusina.vercel.app/products")
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(() => setMenuItems([]));

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
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const renderSection = (title, category) => (
    <>
      <Grid item xs={12}>
        <Typography variant="h4" className="menu-section-title">{title}</Typography>
      </Grid>
      <Grid container item spacing={2} justifyContent="center">
        {menuItems.filter(item => item.category === category).map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={item._id || idx} className="menu-grid-item">
            <Card className="menu-card">
              <CardMedia
                component="img"
                image={
                  item.image && item.image.startsWith('http')
                    ? item.image
                    : item.image
                      ? `https://kantokusina.vercel.app${item.image}`
                      : ''
                }
                alt={item.name}
                className="menu-card-media"
              />
              <CardContent className="menu-card-content">
                <Typography variant="h5" className="menu-card-title">{item.name}</Typography>
                <Typography variant="body2" className="menu-card-category">{item.category}</Typography>
                <Typography variant="subtitle1" className="menu-card-price">{item.price}</Typography>
              </CardContent>
              <Button
                variant="contained"
                fullWidth
                className="menu-add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <div className="menu-page">
      <Container>
        <Typography variant="h3" component="h1" className="menu-title">
          Menu
        </Typography>

        <Grid container spacing={{ xs: 2, md: 4 }} direction="column" alignItems="center">
          {renderSection('Rice Meal', 'Rice Meal')}
          {renderSection('Snacks', 'Snacks')}
          {renderSection('Drinks', 'Drinks')}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            className="menu-snackbar-alert"
            sx={{ width: '100%' }}
          >
            Added to cart!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default Menu;
