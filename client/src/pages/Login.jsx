import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Paper, Alert, CircularProgress } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      console.log("Login successful:", result);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + (err.message || "Invalid credentials"));
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
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue creating amazing designs
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/register")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#667eea",
                  }}
                >
                  Create Account
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