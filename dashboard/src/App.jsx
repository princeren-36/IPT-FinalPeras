import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
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
    <div className="app-responsive-root">
      {!hideNav && <NavBar />}
      <div className="app-responsive-content">
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
      </div>
    </div>
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
