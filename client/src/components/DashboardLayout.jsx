import React from 'react';
import { Box, Container } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="xl">
        {children}
      </Container>
    </Box>
  );
};

export default DashboardLayout;