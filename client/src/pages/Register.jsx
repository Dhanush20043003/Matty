import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Paper, Alert, CircularProgress } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed: " + (err.message || "Please try again"));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            background: "white",
          }}
        >
          {/* Logo */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Typography variant="h3" sx={{ color: "white" }}>
                🎨
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              Matty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Design Your Imagination
            </Typography>
          </Box>

          {/* Welcome Text */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join Matty and start designing today!
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Register Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              helperText="Must be at least 6 characters"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Box>

          {/* Features */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mt: 4,
              pt: 3,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">🎨</Typography>
              <Typography variant="caption" color="text.secondary">
                1500+ Templates
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">✨</Typography>
              <Typography variant="caption" color="text.secondary">
                AI-Powered
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">⚡</Typography>
              <Typography variant="caption" color="text.secondary">
                Fast & Easy
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}