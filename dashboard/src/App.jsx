import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Home from './client/Home';
import About from './client/About';
import Menu from './client/Menu';
import Cart from './client/Cart';
import NavBar from './client/NavBar';
import Login from "./client/Login";
import Register from "./client/Register";

import Admin from './admin/Dashboard';
import ManageProducts from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import AdminSidebar from "./admin/AdminSidebar";

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const hideNav = ["/login", "/register", "/admin", "/admin/manageproducts", "/admin/manageusers"].includes(path);
  const showAdminSidebar = path.startsWith("/admin");

  const handleAdminTabChange = (index) => {
    const paths = ["/admin", "/admin/manageusers", "/admin/manageproducts"];
    navigate(paths[index]);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <>
      {!hideNav && <NavBar />}
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {showAdminSidebar && (
          <AdminSidebar
            tab={path === "/admin" ? 0 : path === "/admin/manageusers" ? 1 : 2}
            onTabChange={handleAdminTabChange}
            onLogout={() => {
              localStorage.removeItem("user");
              navigate("/"); // Go to landing page
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes - protected */}
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/admin/manageproducts" element={isAdmin ? <ManageProducts /> : <Navigate to="/login" />} />
            <Route path="/admin/manageusers" element={isAdmin ? <ManageUsers /> : <Navigate to="/login" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
