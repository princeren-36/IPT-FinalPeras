import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Admin() {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 } }}>
      <Paper elevation={3} sx={{
        p: { xs: 2, md: 4 },
        background: '#3a3f5c',
        color: '#fff',
        borderRadius: 2
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{
          color: "#ffb347",
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "2.5rem" }
        }}>
          Admin Sign In
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
          This is the admin sign in/registration page of your application.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Admin;