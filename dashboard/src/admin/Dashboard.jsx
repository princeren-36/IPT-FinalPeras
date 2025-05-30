import React from 'react';
import { Typography, Box } from '@mui/material';
import AdminSidebar from './AdminSidebar';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#23263a' }}>
      <AdminSidebar tab={0} onTabChange={() => {}} onLogout={() => {}} />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" sx={{ color: '#ffb347', mb: 2 }}>Welcome, Admin!</Typography>
        <Typography>Here you can manage users and products.</Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;
