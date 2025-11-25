import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, Button, Chip, TextField, InputAdornment } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid as GridIcon, List, Download, Crown } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Templates = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Templates', count: 1500 },
    { id: 'social', name: 'Social Media', count: 450 },
    { id: 'collage', name: 'Photo Collage', count: 180 },
    { id: 'business', name: 'Business', count: 320 },
    { id: 'web', name: 'Web Graphics', count: 200 }
  ];

  const templates = [
    {
      id: 1,
      title: 'Instagram Post - Fashion',
      category: 'social',
      platform: 'instagram',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop',
      premium: false,
      tags: ['fashion', 'square', 'minimal'],
      popular: true,
      downloads: 1420
    },
    {
      id: 2,
      title: 'Photo Collage - 6 Grid',
      category: 'collage',
      size: '1200x1200',
      thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&h=600&fit=crop',
      premium: false,
      tags: ['grid', 'memories', 'family'],
      popular: true,
      downloads: 2150
    },
    {
      id: 3,
      title: 'Business Card',
      category: 'business',
      size: '3.5x2 in',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      premium: true,
      tags: ['business', 'professional', 'card'],
      popular: false,
      downloads: 650
    },
    {
      id: 4,
      title: 'Instagram Story - Travel',
      category: 'social',
      platform: 'instagram',
      size: '1080x1920',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop',
      premium: false,
      tags: ['story', 'travel', 'adventure'],
      popular: true,
      downloads: 3200
    },
    {
      id: 5,
      title: 'Web Banner - Hero',
      category: 'web',
      size: '1920x600',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      premium: true,
      tags: ['web', 'banner', 'hero'],
      popular: false,
      downloads: 540
    },
    {
      id: 6,
      title: 'Facebook Cover',
      category: 'social',
      platform: 'facebook',
      size: '1640x856',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop',
      premium: false,
      tags: ['facebook', 'cover', 'header'],
      popular: true,
      downloads: 1890
    },
    {
      id: 7,
      title: 'YouTube Thumbnail',
      category: 'social',
      platform: 'youtube',
      size: '1280x720',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      premium: false,
      tags: ['youtube', 'thumbnail', 'video'],
      popular: true,
      downloads: 2890
    },
    {
      id: 8,
      title: 'Twitter Post',
      category: 'social',
      platform: 'twitter',
      size: '1200x675',
      thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=400&fit=crop',
      premium: false,
      tags: ['twitter', 'post', 'social'],
      popular: false,
      downloads: 980
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Browse Templates
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose from {templates.length}+ professionally designed templates
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                startIcon={<Filter />}
                variant="outlined"
              >
                Filters
              </Button>
              <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', borderRadius: 1, p: 0.5 }}>
                <Button
                  onClick={() => setViewMode('grid')}
                  sx={{
                    minWidth: 40,
                    bgcolor: viewMode === 'grid' ? 'white' : 'transparent',
                    '&:hover': { bgcolor: viewMode === 'grid' ? 'white' : '#e0e0e0' }
                  }}
                >
                  <GridIcon size={20} />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  sx={{
                    minWidth: 40,
                    bgcolor: viewMode === 'list' ? 'white' : 'transparent',
                    '&:hover': { bgcolor: viewMode === 'list' ? 'white' : '#e0e0e0' }
                  }}
                >
                  <List size={20} />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Categories */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={`${cat.name} (${cat.count})`}
            onClick={() => setActiveCategory(cat.id)}
            color={activeCategory === cat.id ? 'primary' : 'default'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              py: 2.5,
              px: 1,
              background: activeCategory === cat.id 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'white',
              color: activeCategory === cat.id ? 'white' : '#475569',
              '&:hover': {
                background: activeCategory === cat.id 
                  ? 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)'
                  : '#f5f5f5',
              }
            }}
          />
        ))}
      </Box>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={viewMode === 'grid' ? 3 : 12} key={template.id}>
            <Paper
              sx={{
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: viewMode === 'list' ? 'flex' : 'block',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: viewMode === 'list' ? 300 : '100%',
                  flexShrink: 0
                }}
              >
                <Box
                  component="img"
                  src={template.thumbnail}
                  alt={template.title}
                  sx={{
                    width: '100%',
                    height: viewMode === 'list' ? 200 : 250,
                    objectFit: 'cover'
                  }}
                />
                {template.premium && (
                  <Chip
                    icon={<Crown size={12} />}
                    label="PRO"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                )}
                {template.popular && (
                  <Chip
                    label="Popular"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: '#ef4444',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>
              <Box sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {template.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: 'text.secondary' }}>
                  <Typography variant="body2">{template.size}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Download size={14} />
                    <Typography variant="body2">{template.downloads}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {template.tags.slice(0, 3).map((tag, idx) => (
                    <Chip 
                      key={idx} 
                      label={tag} 
                      size="small"
                      sx={{ 
                        bgcolor: '#ede9fe', 
                        color: '#7c3aed',
                        fontSize: '11px'
                      }} 
                    />
                  ))}
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate('/editor')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    }
                  }}
                >
                  Use Template
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No templates found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default Templates;