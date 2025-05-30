import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, Button,
  Snackbar, Alert
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
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          direction="column"
          alignItems="center"
        >
          {/* Rice Meal Section */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ color: '#ffb347', fontWeight: 'bold', mt: 4, mb: 2, textAlign: 'center' }}>Rice Meal</Typography>
          </Grid>
          <Grid container item spacing={2} justifyContent="center">
            {menuItems.filter(item => item.category === 'Rice Meal').map((item, idx) => (
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
                    width: { xs: 320, sm: 320, md: 320 },
                    maxWidth: 320,
                    minWidth: 220,
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

          {/* Snacks Section */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ color: '#ffb347', fontWeight: 'bold', mt: 4, mb: 2, textAlign: 'center' }}>Snacks</Typography>
          </Grid>
          <Grid container item spacing={2} justifyContent="center">
            {menuItems.filter(item => item.category === 'Snacks').map((item, idx) => (
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
                    width: { xs: 320, sm: 320, md: 320 },
                    maxWidth: 320,
                    minWidth: 220,
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

          {/* Drinks Section */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ color: '#ffb347', fontWeight: 'bold', mt: 4, mb: 2, textAlign: 'center' }}>Drinks</Typography>
          </Grid>
          <Grid container item spacing={2} justifyContent="center">
            {menuItems.filter(item => item.category === 'Drinks').map((item, idx) => (
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
                    width: { xs: 320, sm: 320, md: 320 },
                    maxWidth: 320,
                    minWidth: 220,
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
      </Container>
    </div>
  );
}

export default Menu;
