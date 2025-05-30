import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles/Navbar.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Cart", to: "/cart" },
];

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

  const [user, setUser] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleLogoutClick = () => setLogoutDialogOpen(true);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLogoutDialogOpen(false);
    navigate("/");
  };

  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  return (
    <>
      <AppBar position="sticky" className="navbar-appbar">
        <Toolbar className="navbar-toolbar">
          <Box className="navbar-logo-title">
            <Button
              variant="text"
              component={RouterLink}
              to="/"
              className="navbar-title"
              style={{ minWidth: 0, padding: 0 }}
            >
              <img
                src="/kantokusina.png"
                alt="Kanto Kusina Logo"
                className="navbar-logo-img"
              />
            </Button>
            <Typography variant="h6">Kanto Kusina</Typography>
          </Box>

          {!isMobile && (
            <Box className="navbar-links">
              {navLinks.map((link) => (
                <Button
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  className="navbar-link-btn"
                >
                  {link.label}
                </Button>
              ))}

              {!user && (
                <Button
                  component={RouterLink}
                  to="/login"
                  className="navbar-admin-btn"
                >
                  Login
                </Button>
              )}

              {user && (
                <Button
                  onClick={handleLogoutClick}
                  className="navbar-admin-btn"
                  color="inherit"
                >
                  Logout
                </Button>
              )}
            </Box>
          )}

          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                className="navbar-menu-btn"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{ width: 220 }}
                  role="presentation"
                  onClick={handleDrawerToggle}
                  onKeyDown={handleDrawerToggle}
                >
                  <List>
                    {navLinks.map((link) => (
                      <ListItem key={link.to} disablePadding>
                        <ListItemButton component={RouterLink} to={link.to}>
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}

                    {!user && (
                      <ListItem disablePadding>
                        <ListItemButton component={RouterLink} to="/login">
                          <ListItemText
                            primary="Login"
                            primaryTypographyProps={{
                              className: "navbar-admin-drawer-text",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )}

                    {user && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleLogoutClick}>
                          <ListItemText
                            primary="Logout"
                            primaryTypographyProps={{
                              className: "navbar-admin-drawer-text",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} autoFocus color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NavBar;
