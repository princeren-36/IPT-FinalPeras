import { React, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, MenuItem } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userData, setUserData] = useState({ username: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    let currentErrors = {};
    let isValid = true;

    if (!userData.username.trim()) {
      currentErrors.username = "Username is required.";
      isValid = false;
    } else if (userData.username.trim().length < 3) {
      currentErrors.username = "Username must be at least 3 characters long.";
      isValid = false;
    }

    if (!userData.password.trim()) {
      currentErrors.password = "Password is required.";
      isValid = false;
    } else if (userData.password.trim().length < 6) {
      currentErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("https://kantokusina.vercel.app/user/register", userData);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <Box className="login" display="flex" height="100vh">
      

      <Paper className="container-login" elevation={6} sx={{ p: 4, width: "25%", margin: "auto" }}>
        <Typography variant="h5" gutterBottom>Register</Typography>

        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.username}
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
          value={userData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          select
          label="Role"
          name="role"
          fullWidth
          margin="normal"
          value={userData.role}
          onChange={handleChange}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button variant="contained" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>
          Register
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#1976d2" }}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
