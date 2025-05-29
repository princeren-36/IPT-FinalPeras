import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar position="sticky" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        {/* Logo and Title */}
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
          <Typography variant="h6">
              Kanto Kusina
            </Typography>
        </Box>
        {/* Desktop Links */}
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
            <Button
              component={RouterLink}
              to="/admin"
              className="navbar-admin-btn"
            >
              Admin
            </Button>
          </Box>
        )}
        {/* Mobile Menu Button */}
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
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/admin">
                      <ListItemText
                        primary="Admin Sign In"
                        primaryTypographyProps={{
                          className: "navbar-admin-drawer-text",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
