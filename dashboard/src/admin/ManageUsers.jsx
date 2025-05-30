import React, { useEffect, useState } from 'react';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, Alert, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from './AdminSidebar';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [userSnackbar, setUserSnackbar] = useState('');

  // Fetch users from backend on mount
  useEffect(() => {
  fetch('https://kantokusina.vercel.app/api/user/all')
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(() => setUserSnackbar('Failed to fetch users'));
}, []);

const onUserDelete = async (userId) => {
  try {
    const res = await fetch(`https://kantokusina.vercel.app/api/user/${userId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      setUsers(users.filter(u => u._id !== userId));
      setUserSnackbar('User deleted');
    } else {
      setUserSnackbar('Failed to delete user');
    }
  } catch {
    setUserSnackbar('Failed to delete user');
  }
};
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#23263a' }}>
      <AdminSidebar tab={1} onTabChange={() => {}} onLogout={() => { window.location.href = '/login'; }} />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" sx={{ color: '#ffb347', mb: 3, fontWeight: 'bold' }}>Admin - Manage Users</Typography>
        <TableContainer component={Paper} sx={{ background: '#264653', color: '#fff', mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffb347' }}>Username</TableCell>
                <TableCell sx={{ color: '#ffb347' }}>Role</TableCell>
                <TableCell sx={{ color: '#ffb347' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow key={user._id || idx}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => onUserDelete(user._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar open={!!userSnackbar} autoHideDuration={2000} onClose={() => setUserSnackbar('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setUserSnackbar('')} severity="success" sx={{ width: '100%' }}>{userSnackbar}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ManageUsers;
