import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 } }}>
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
          About
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
          Welcome to Nueva Vizcaya Eats! We are dedicated to serving authentic and delicious cuisine inspired by the rich culture of Nueva Vizcaya. Our story began in 2020, and we continue to bring joy to our community through food.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;