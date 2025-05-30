import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider, Button, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function AdminSidebar({ tab, onTabChange, onLogout }) {
  const navigate = useNavigate();

  const handleNav = (idx, path) => {
    onTabChange(idx);
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#23263a',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={tab === 0} onClick={() => handleNav(0, '/admin')} style={{ cursor: 'pointer' }}>
              <ListItemIcon sx={{ color: '#ffb347' }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={tab === 2} onClick={() => handleNav(2, '/admin/manageproducts')} style={{ cursor: 'pointer' }}>
              <ListItemIcon sx={{ color: '#ffb347' }}><RestaurantMenuIcon /></ListItemIcon>
              <ListItemText primary="Manage Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={tab === 1} onClick={() => handleNav(1, '/admin/manageusers')} style={{ cursor: 'pointer' }}>
              <ListItemIcon sx={{ color: '#ffb347' }}><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ background: '#444' }} />
        <Box sx={{ p: 2 }}>
          <Button
  variant="contained"
  color="warning"
  startIcon={<LogoutIcon />}
  fullWidth
  onClick={() => {
    localStorage.removeItem('user'); // Clear user data from local storage
    if (onLogout) {
      onLogout(); // Call any onLogout function passed from the parent
    }
    navigate('/'); // Navigate to the landing page (assuming it's the home page)
  }}
  sx={{ fontWeight: 'bold' }}
>
  Logout
</Button>

        </Box>
      </Box>
    </Drawer>
  );
}

export default AdminSidebar;
