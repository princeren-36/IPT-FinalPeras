import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setLoginError("");
  };

  const handleLogin = async () => {
    const currentErrors = {};
    if (!credentials.username.trim()) currentErrors.username = "Username is required";
    if (!credentials.password.trim()) currentErrors.password = "Password is required";
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://kantokusina.vercel.app/user/login",
        credentials
      );
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // Notify app of login
      window.dispatchEvent(new CustomEvent("userChanged", { detail: user }));

      // Redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoginError("Invalid username or password.");
    }
  };

  return (
    <Box display="flex" height="100vh">
      

      <Paper
        elevation={6}
        sx={{ p: 4, width: { xs: "90%", sm: "60%", md: "25%" }, margin: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {loginError && (
          <Typography color="error" align="center" sx={{ mt: 1 }}>
            {loginError}
          </Typography>
        )}

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

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate(-1)}
          sx={{ mt: 1 }}
        >
          Go Back
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "#1976d2" }}
          >
            Register
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
