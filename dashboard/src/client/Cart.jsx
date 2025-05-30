import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardContent, CardMedia, Grid, Button, Box,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    fetch("https://kantokusina.vercel.app/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const cartItems = cart.map(cartItem => {
    const product = products.find(prod => prod._id === cartItem.id);
    return product ? { ...product, qty: cartItem.qty } : null;
  }).filter(Boolean);

  const handleRemove = (idx) => {
    const updatedCart = cart.filter((_, i) => i !== idx);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleChangeQty = (idx, delta) => {
    const updatedCart = cart.map((item, i) =>
      i === idx ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      let price = 0;
      if (typeof item.price === 'number') {
        price = item.price;
      } else if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      }
      return sum + (isNaN(price) ? 0 : price) * item.qty;
    }, 0);
  };

  const handleOpenPayDialog = () => setPayDialogOpen(true);
  const handleClosePayDialog = () => setPayDialogOpen(false);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("You must be logged in to place an order.");
      handleClosePayDialog();
      return;
    }

    const { name, email, address } = userDetails;
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    }
    if (!address.trim()) newErrors.address = "Address is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const orderData = {
      userId: user._id, 
      name,
      email,
      address,
      cart: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      total: getTotal(),
    };

    try {
      const response = await fetch("https://kantokusina.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order");

      const result = await response.json();
      console.log("Order placed:", result);
      alert("Order placed successfully!");

      setCart([]);
      localStorage.removeItem("cart");
      handleClosePayDialog();
      setErrors({});
      setUserDetails({ name: '', email: '', address: '' });
    } catch (error) {
      console.error(error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 } }}>
      <Typography variant="h3" gutterBottom sx={{
        color: "#ffb347",
        fontWeight: "bold",
        fontSize: { xs: "1.5rem", md: "2.5rem" }
      }}>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#fff" }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item, idx) => (
              <Grid item xs={12} sm={6} key={item._id || idx}>
                <Card sx={{ background: '#355c60', color: '#fff', borderRadius: 2, boxShadow: 3, display: 'flex' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      item.image
                        ? item.image.startsWith('http')
                          ? item.image
                          : `https://kantokusina.vercel.app${item.image}`
                        : ''
                    }
                    alt={item.name}
                    sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: "#ffb347", fontWeight: "bold" }}>{item.name}</Typography>
                    <Typography variant="body2">{item.category}</Typography>
                    <Typography variant="subtitle1" sx={{ color: "#ffb347" }}>{item.price}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => handleChangeQty(idx, -1)}
                        disabled={item.qty <= 1}
                        sx={{ color: '#ffb347', border: '1px solid #ffb347', mr: 1 }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.qty}</Typography>
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => handleChangeQty(idx, 1)}
                        sx={{ color: '#ffb347', border: '1px solid #ffb347', ml: 1 }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1, borderColor: '#ffb347', color: '#ffb347' }}
                      onClick={() => handleRemove(idx)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" sx={{ color: "#ffb347", fontWeight: "bold" }}>
              Total: ₱{getTotal()}
            </Typography>
            <Button
              variant="contained"
              color="warning"
              sx={{ fontWeight: "bold", borderRadius: 2 }}
              onClick={handleOpenPayDialog}
              disabled={cartItems.length === 0}
            >
              Pay
            </Button>
          </Box>
        </>
      )}

      {/* Pay Dialog */}
      <Dialog open={payDialogOpen} onClose={handleClosePayDialog} fullWidth maxWidth="sm">
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={handleUserInputChange}
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleUserInputChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            value={userDetails.address}
            onChange={handleUserInputChange}
            fullWidth
            required
            error={!!errors.address}
            helperText={errors.address}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayDialog}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleOrderSubmit}>
            Order Now
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Cart;
