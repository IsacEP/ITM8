import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
