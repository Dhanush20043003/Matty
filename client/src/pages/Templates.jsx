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
    { id: 'all', name: 'All Templates', count: 12 },
    { id: 'social', name: 'Social Media', count: 6 },
    { id: 'business', name: 'Business', count: 3 },
    { id: 'marketing', name: 'Marketing', count: 3 }
  ];

  // Template definitions with actual design elements
  const templates = [
    {
      id: 1,
      title: 'Instagram Post - Summer Sale',
      category: 'social',
      platform: 'instagram',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop',
      premium: false,
      tags: ['sale', 'summer', 'instagram'],
      popular: true,
      downloads: 1420,
      templateData: {
        backgroundColor: '#FFE5B4',
        elements: [
          {
            type: 'rect',
            left: 50,
            top: 50,
            width: 980,
            height: 300,
            fill: '#FF6B6B',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Header Background'
          },
          {
            type: 'text',
            text: 'SUMMER SALE',
            left: 200,
            top: 120,
            fontSize: 80,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Title Text'
          },
          {
            type: 'text',
            text: 'UP TO 50% OFF',
            left: 300,
            top: 220,
            fontSize: 48,
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            name: 'Subtitle Text'
          },
          {
            type: 'circle',
            left: 400,
            top: 500,
            radius: 150,
            fill: '#4ECDC4',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Decorative Circle'
          },
          {
            type: 'text',
            text: 'Shop Now',
            left: 420,
            top: 900,
            fontSize: 40,
            fill: '#000000',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'CTA Text'
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Instagram Story - Product Launch',
      category: 'social',
      platform: 'instagram',
      size: '1080x1920',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
      premium: false,
      tags: ['story', 'product', 'launch'],
      popular: true,
      downloads: 2890,
      templateData: {
        backgroundColor: '#6C5CE7',
        elements: [
          {
            type: 'text',
            text: 'NEW ARRIVAL',
            left: 200,
            top: 200,
            fontSize: 64,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Header'
          },
          {
            type: 'rect',
            left: 100,
            top: 600,
            width: 880,
            height: 600,
            fill: '#FFFFFF',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Content Box'
          },
          {
            type: 'text',
            text: 'Product Name',
            left: 250,
            top: 750,
            fontSize: 48,
            fill: '#000000',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Product Title'
          },
          {
            type: 'text',
            text: 'Swipe up to shop',
            left: 300,
            top: 1600,
            fontSize: 36,
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            name: 'CTA'
          }
        ]
      }
    },
    {
      id: 3,
      title: 'Business Card - Modern',
      category: 'business',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      premium: true,
      tags: ['business', 'professional', 'card'],
      popular: false,
      downloads: 650,
      templateData: {
        backgroundColor: '#2C3E50',
        elements: [
          {
            type: 'rect',
            left: 0,
            top: 0,
            width: 540,
            height: 1080,
            fill: '#34495E',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Left Panel'
          },
          {
            type: 'text',
            text: 'John Doe',
            left: 600,
            top: 300,
            fontSize: 60,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Name'
          },
          {
            type: 'text',
            text: 'Graphic Designer',
            left: 600,
            top: 380,
            fontSize: 32,
            fill: '#BDC3C7',
            fontFamily: 'Arial',
            name: 'Job Title'
          },
          {
            type: 'text',
            text: 'john@email.com',
            left: 600,
            top: 500,
            fontSize: 28,
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            name: 'Email'
          },
          {
            type: 'text',
            text: '+1 234 567 8900',
            left: 600,
            top: 550,
            fontSize: 28,
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            name: 'Phone'
          }
        ]
      }
    },
    {
      id: 4,
      title: 'Facebook Post - Event',
      category: 'social',
      platform: 'facebook',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop',
      premium: false,
      tags: ['event', 'facebook', 'party'],
      popular: true,
      downloads: 1890,
      templateData: {
        backgroundColor: '#F8B500',
        elements: [
          {
            type: 'circle',
            left: 390,
            top: 90,
            radius: 300,
            fill: '#FFFFFF',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Circle Background'
          },
          {
            type: 'text',
            text: 'YOU\'RE INVITED',
            left: 180,
            top: 750,
            fontSize: 64,
            fill: '#000000',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Title'
          },
          {
            type: 'text',
            text: 'Join us for a celebration',
            left: 200,
            top: 850,
            fontSize: 36,
            fill: '#000000',
            fontFamily: 'Arial',
            name: 'Subtitle'
          },
          {
            type: 'text',
            text: 'Date: December 25, 2024',
            left: 250,
            top: 950,
            fontSize: 28,
            fill: '#000000',
            fontFamily: 'Arial',
            name: 'Date'
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Marketing Flyer - Gym',
      category: 'marketing',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop',
      premium: false,
      tags: ['gym', 'fitness', 'flyer'],
      popular: true,
      downloads: 1250,
      templateData: {
        backgroundColor: '#1E3A8A',
        elements: [
          {
            type: 'text',
            text: 'GET FIT',
            left: 300,
            top: 150,
            fontSize: 90,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Main Title'
          },
          {
            type: 'text',
            text: 'JOIN TODAY',
            left: 280,
            top: 270,
            fontSize: 60,
            fill: '#FCD34D',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Subtitle'
          },
          {
            type: 'rect',
            left: 150,
            top: 500,
            width: 780,
            height: 400,
            fill: '#FFFFFF',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Info Box'
          },
          {
            type: 'text',
            text: 'Limited Time Offer',
            left: 280,
            top: 600,
            fontSize: 48,
            fill: '#000000',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Offer Text'
          },
          {
            type: 'text',
            text: 'First Month Free',
            left: 320,
            top: 700,
            fontSize: 42,
            fill: '#EF4444',
            fontFamily: 'Arial',
            name: 'Price'
          }
        ]
      }
    },
    {
      id: 6,
      title: 'Instagram Post - Quote',
      category: 'social',
      platform: 'instagram',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=600&h=600&fit=crop',
      premium: false,
      tags: ['quote', 'motivation', 'instagram'],
      popular: true,
      downloads: 3200,
      templateData: {
        backgroundColor: '#FDE68A',
        elements: [
          {
            type: 'rect',
            left: 100,
            top: 300,
            width: 880,
            height: 480,
            fill: 'rgba(0,0,0,0.7)',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Quote Background'
          },
          {
            type: 'text',
            text: '"Success is not final,',
            left: 200,
            top: 400,
            fontSize: 52,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Quote Line 1'
          },
          {
            type: 'text',
            text: 'failure is not fatal"',
            left: 220,
            top: 480,
            fontSize: 52,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Quote Line 2'
          },
          {
            type: 'text',
            text: '- Winston Churchill',
            left: 380,
            top: 650,
            fontSize: 32,
            fill: '#FCD34D',
            fontFamily: 'Arial',
            name: 'Author'
          }
        ]
      }
    },
    {
      id: 7,
      title: 'Business Presentation Cover',
      category: 'business',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=600&fit=crop',
      premium: true,
      tags: ['business', 'presentation', 'professional'],
      popular: false,
      downloads: 890,
      templateData: {
        backgroundColor: '#1F2937',
        elements: [
          {
            type: 'rect',
            left: 0,
            top: 0,
            width: 1080,
            height: 200,
            fill: '#3B82F6',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Header'
          },
          {
            type: 'text',
            text: 'QUARTERLY',
            left: 250,
            top: 50,
            fontSize: 64,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Title'
          },
          {
            type: 'text',
            text: 'REPORT',
            left: 350,
            top: 130,
            fontSize: 48,
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            name: 'Subtitle'
          },
          {
            type: 'text',
            text: 'Q4 2024',
            left: 420,
            top: 500,
            fontSize: 80,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Quarter'
          },
          {
            type: 'rect',
            left: 200,
            top: 700,
            width: 680,
            height: 5,
            fill: '#3B82F6',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Divider'
          },
          {
            type: 'text',
            text: 'Company Name',
            left: 380,
            top: 850,
            fontSize: 36,
            fill: '#9CA3AF',
            fontFamily: 'Arial',
            name: 'Company'
          }
        ]
      }
    },
    {
      id: 8,
      title: 'Marketing Banner - Restaurant',
      category: 'marketing',
      size: '1080x1080',
      thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop',
      premium: false,
      tags: ['food', 'restaurant', 'banner'],
      popular: true,
      downloads: 1680,
      templateData: {
        backgroundColor: '#DC2626',
        elements: [
          {
            type: 'circle',
            left: 340,
            top: 340,
            radius: 280,
            fill: '#FFFFFF',
            stroke: '#000',
            strokeWidth: 0,
            name: 'Center Circle'
          },
          {
            type: 'text',
            text: 'GRAND',
            left: 370,
            top: 430,
            fontSize: 70,
            fill: '#DC2626',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Title 1'
          },
          {
            type: 'text',
            text: 'OPENING',
            left: 330,
            top: 520,
            fontSize: 70,
            fill: '#DC2626',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Title 2'
          },
          {
            type: 'text',
            text: 'Your Restaurant Name',
            left: 240,
            top: 850,
            fontSize: 48,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            name: 'Restaurant Name'
          },
          {
            type: 'text',
            text: '20% OFF for Opening Week',
            left: 220,
            top: 950,
            fontSize: 36,
            fill: '#FCD34D',
            fontFamily: 'Arial',
            name: 'Offer'
          }
        ]
      }
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    navigate('/editor', { 
      state: { 
        template: template.templateData 
      } 
    });
  };

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
                  onClick={() => handleUseTemplate(template)}
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