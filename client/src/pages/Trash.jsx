import React, { useState } from 'react';
import { 
  Typography, Grid, Paper, Box, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Trash2, RotateCcw, XCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Trash = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const trashedDesigns = [
    {
      id: 1,
      name: 'Old Campaign',
      type: 'Instagram Post',
      deletedDate: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Draft Banner',
      type: 'Web Banner',
      deletedDate: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Test Design',
      type: 'Photo Collage',
      deletedDate: '2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&h=400&fit=crop'
    }
  ];

  const handleRestore = (design) => {
    alert(`"${design.name}" has been restored to My Designs`);
  };

  const handlePermanentDelete = (design) => {
    setSelectedDesign(design);
    setDeleteDialogOpen(true);
  };

  const confirmPermanentDelete = () => {
    alert(`"${selectedDesign.name}" has been permanently deleted`);
    setDeleteDialogOpen(false);
    setSelectedDesign(null);
  };

  const handleEmptyTrash = () => {
    if (window.confirm('Are you sure you want to permanently delete all items in trash? This action cannot be undone.')) {
      alert('Trash emptied successfully');
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Trash2 size={36} color="#f97316" />
            Trash
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Items will be permanently deleted after 30 days
          </Typography>
        </Box>
        {trashedDesigns.length > 0 && (
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleEmptyTrash}
          >
            Empty Trash
          </Button>
        )}
      </Box>

      {trashedDesigns.length > 0 ? (
        <Grid container spacing={3}>
          {trashedDesigns.map((design) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={design.id}>
              <Paper
                sx={{
                  overflow: 'hidden',
                  opacity: 0.8,
                  transition: 'all 0.3s',
                  '&:hover': {
                    opacity: 1,
                    boxShadow: 4
                  }
                }}
              >
                <Box
                  component="img"
                  src={design.thumbnail}
                  alt={design.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    filter: 'grayscale(50%)'
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {design.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {design.type} • Deleted {design.deletedDate}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      fullWidth
                      variant="outlined" 
                      size="small"
                      startIcon={<RotateCcw size={16} />}
                      onClick={() => handleRestore(design)}
                    >
                      Restore
                    </Button>
                    <Button 
                      fullWidth
                      variant="outlined" 
                      color="error"
                      size="small"
                      startIcon={<XCircle size={16} />}
                      onClick={() => handlePermanentDelete(design)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Trash2 size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Trash is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deleted designs will appear here
          </Typography>
        </Box>
      )}

      {/* Permanent Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Permanently Delete?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to permanently delete "{selectedDesign?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmPermanentDelete} color="error" variant="contained">
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Trash;