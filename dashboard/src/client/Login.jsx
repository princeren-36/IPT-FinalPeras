import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleLogin = async () => {
    let currentErrors = {};
    if (!credentials.username.trim()) currentErrors.username = "Username is required";
    if (!credentials.password.trim()) currentErrors.password = "Password is required";
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    try {
      const response = await axios.post("https://kantokusina.vercel.app/user/login", credentials);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "user") {
        navigate("/user");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Invalid username or password.");
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box flex={1}>
        <img src="/images/login.jpg" alt="login" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>

      <Paper elevation={6} sx={{ p: 4, width: "25%", margin: "auto" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "#1976d2" }}>Register</span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;