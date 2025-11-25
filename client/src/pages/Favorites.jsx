import React from 'react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Star, Edit } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Favorites = () => {
  const navigate = useNavigate();

  const favorites = [
    {
      id: 1,
      name: 'Brand Logo Design',
      type: 'Logo',
      date: 'Last week',
      thumbnail: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Instagram Story Template',
      type: 'Social Media',
      date: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Event Poster',
      type: 'Poster',
      date: '1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    }
  ];

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Star size={36} color="#eab308" fill="#eab308" />
          Favorite Designs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your starred and favorite designs in one place
        </Typography>
      </Box>

      {favorites.length > 0 ? (
        <Grid container spacing={3}>
          {favorites.map((design) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={design.id}>
              <Paper
                sx={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate('/editor')}
              >
                <Box
                  component="img"
                  src={design.thumbnail}
                  alt={design.name}
                  sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{ 
                  position: 'absolute', 
                  top: 12, 
                  right: 12,
                  bgcolor: 'white',
                  borderRadius: '50%',
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star size={20} color="#eab308" fill="#eab308" />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {design.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                    <Typography variant="body2">{design.type}</Typography>
                    <Typography variant="body2">{design.date}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Star size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No favorite designs yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Star your favorite designs to find them easily here
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/my-designs')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              }
            }}
          >
            Browse My Designs
          </Button>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default Favorites;