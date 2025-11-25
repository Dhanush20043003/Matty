import React from 'react';
import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import QuickStats from '../components/QuickStats';

const DashboardHome = () => {
  const navigate = useNavigate();

  const socialPlatforms = [
    { name: 'Instagram', icon: Instagram, templates: 120, gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)' },
    { name: 'Facebook', icon: Facebook, templates: 95, gradient: 'linear-gradient(135deg, #1877f2 0%, #0c5fcd 100%)' },
    { name: 'Twitter', icon: Twitter, templates: 80, gradient: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)' },
    { name: 'YouTube', icon: Youtube, templates: 65, gradient: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' }
  ];

  const recentProjects = [
    { id: 1, name: 'Summer Campaign', type: 'Instagram Post', date: '2 hours ago', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop' },
    { id: 2, name: 'Birthday Collage', type: 'Photo Collage', date: '1 day ago', thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop' },
    { id: 3, name: 'Product Launch', type: 'Facebook Cover', date: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop' }
  ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Let's create something amazing today
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ mb: 5 }}>
        <QuickStats />
      </Box>

      {/* Design for Social Media */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Design for Social Media
        </Typography>
        <Grid container spacing={2}>
          {socialPlatforms.map((platform) => (
            <Grid item xs={12} sm={6} md={3} key={platform.name}>
              <Paper
                onClick={() => navigate('/editor')}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  background: platform.gradient,
                  color: 'white',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  }
                }}
              >
                <platform.icon size={32} style={{ marginBottom: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {platform.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {platform.templates} templates
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Continue Editing */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Continue Editing
          </Typography>
          <Button 
            endIcon={<ArrowRight size={16} />}
            onClick={() => navigate('/my-designs')}
            sx={{ color: '#667eea', fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {recentProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Paper
                onClick={() => navigate('/editor')}
                sx={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box
                  component="img"
                  src={project.thumbnail}
                  alt={project.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {project.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                    <Typography variant="body2">{project.type}</Typography>
                    <Typography variant="body2">{project.date}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default DashboardHome;