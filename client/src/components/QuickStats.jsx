import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Clock, Layout, Trash2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickStats = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      icon: Clock, 
      label: 'Recent Projects', 
      count: '12', 
      color: '#3b82f6', 
      bg: '#dbeafe',
      path: '/dashboard'
    },
    { 
      icon: Layout, 
      label: 'Drafts', 
      count: '5', 
      color: '#10b981', 
      bg: '#d1fae5',
      path: '/my-designs'
    },
    { 
      icon: Trash2, 
      label: 'Trash', 
      count: '3', 
      color: '#f97316', 
      bg: '#fed7aa',
      path: '/trash'
    },
    { 
      icon: Star, 
      label: 'Favorites', 
      count: '24', 
      color: '#eab308', 
      bg: '#fef3c7',
      path: '/favorites'
    }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Paper
            elevation={2}
            onClick={() => navigate(stat.path)}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: stat.bg,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <stat.icon size={28} color={stat.color} />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: stat.color }}>
                {stat.label}
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0f172a' }}>
              {stat.count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Items
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;