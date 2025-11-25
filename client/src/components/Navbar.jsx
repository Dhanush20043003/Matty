import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, InputBase, Box, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Star, Clock, Add } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  
  if (isAuthPage) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/templates?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Typography 
          variant="h5" 
          sx={{ 
            cursor: "pointer", 
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }} 
          onClick={() => navigate("/dashboard")}
        >
          🎨 Matty
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3, mx: 4 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate("/templates")}
            sx={{ 
              fontWeight: location.pathname === '/templates' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/templates' ? '2px solid white' : 'none'
            }}
          >
            Templates
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate("/my-designs")}
            sx={{ 
              fontWeight: location.pathname === '/my-designs' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/my-designs' ? '2px solid white' : 'none'
            }}
          >
            My Designs
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate("/learn")}
            sx={{ 
              fontWeight: location.pathname === '/learn' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/learn' ? '2px solid white' : 'none'
            }}
          >
            Learn
          </Button>
        </Box>

        {/* Search Bar */}
        <SearchBox component="form" onSubmit={handleSearch} sx={{ flex: 1, maxWidth: 500 }}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <IconButton color="inherit" onClick={() => navigate("/dashboard")} title="Recent">
            <Clock />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate("/favorites")} title="Favorites">
            <Star />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/editor")}
            sx={{
              bgcolor: 'white',
              color: '#667eea',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#f0f0f0'
              }
            }}
          >
            Create New
          </Button>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              ml: 2,
              borderLeft: '1px solid rgba(255,255,255,0.3)',
              pl: 2
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;