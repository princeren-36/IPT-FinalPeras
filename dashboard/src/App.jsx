import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './client/Home';
import About from './client/About';
import Menu from './client/Menu';
import NavBar from './client/NavBar'; // Import NavBar here
import Admin from './client/Admin'; // Import Admin component if needed
import Cart from './client/Cart'; // Import Cart component if needed\
import Login from "./client/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* NavBar is now always visible and doesn't re-mount */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
