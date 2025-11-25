import React, { useState } from 'react';
import { 
  Typography, Grid, Paper, Box, Button, 
  Tabs, Tab, Menu, MenuItem, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  MoreVertical, Edit, Copy, Trash2, Download, 
  Star, Archive, Folder, Clock 
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const MyDesigns = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const designs = [
    {
      id: 1,
      name: 'Summer Campaign',
      type: 'Instagram Post',
      date: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
      category: 'recent'
    },
    {
      id: 2,
      name: 'Birthday Collage',
      type: 'Photo Collage',
      date: '1 day ago',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
      category: 'recent'
    },
    {
      id: 3,
      name: 'Product Launch Banner',
      type: 'Web Banner',
      date: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      category: 'recent'
    },
    {
      id: 4,
      name: 'Untitled Design',
      type: 'Instagram Story',
      date: '5 mins ago',
      thumbnail: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop',
      category: 'draft'
    },
    {
      id: 5,
      name: 'Product Banner',
      type: 'Web Banner',
      date: '1 hour ago',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      category: 'draft'
    },
    {
      id: 6,
      name: 'Team Photo Collage',
      type: 'Photo Collage',
      date: 'Last week',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
      category: 'archived'
    }
  ];

  const tabs = [
    { label: 'All Designs', value: 'all', icon: <Folder size={18} /> },
    { label: 'Recent', value: 'recent', icon: <Clock size={18} /> },
    { label: 'Drafts', value: 'draft', icon: <Edit size={18} /> },
    { label: 'Archived', value: 'archived', icon: <Archive size={18} /> }
  ];

  const handleMenuOpen = (event, design) => {
    setAnchorEl(event.currentTarget);
    setSelectedDesign(design);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate('/editor');
    handleMenuClose();
  };

  const handleDuplicate = () => {
    alert('Design duplicated!');
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    alert('Design moved to trash!');
    setDeleteDialogOpen(false);
    setSelectedDesign(null);
  };

  const filteredDesigns = activeTab === 0 
    ? designs 
    : designs.filter(d => d.category === tabs[activeTab].value);

  return (
    <DashboardLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          My Designs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and organize your creative projects
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon} 
              label={tab.label} 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Designs Grid */}
      {filteredDesigns.length > 0 ? (
        <Grid container spacing={3}>
          {filteredDesigns.map((design) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={design.id}>
              <Paper
                sx={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
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
                  onClick={() => navigate('/editor')}
                />
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box sx={{ flex: 1, mr: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'bold', 
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {design.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {design.type}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleMenuOpen(e, design)}
                    >
                      <MoreVertical size={18} />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Modified {design.date}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Folder size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No designs found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start creating amazing designs today!
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/editor')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              }
            }}
          >
            Create New Design
          </Button>
        </Box>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit size={18} style={{ marginRight: 12 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <Copy size={18} style={{ marginRight: 12 }} />
          Duplicate
        </MenuItem>
        <MenuItem>
          <Star size={18} style={{ marginRight: 12 }} />
          Add to Favorites
        </MenuItem>
        <MenuItem>
          <Download size={18} style={{ marginRight: 12 }} />
          Download
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Trash2 size={18} style={{ marginRight: 12 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Design?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to move "{selectedDesign?.name}" to trash? 
            You can restore it later from the Trash folder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Move to Trash
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default MyDesigns;