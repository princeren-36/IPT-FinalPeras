import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import "../styles/ManageProducts.css";
import axios from "axios";
const categories = [
  "Rice Meal",
  "Snacks",
  "Drinks"
];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenDialog = (product = null) => {
    setFormErrors({});
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image || "",
      });
      setImageFile(null);
    } else {
      setEditingProduct(null);
      setForm({ name: "", price: "", category: "", image: "" });
      setImageFile(null);
    }
    setDialogOpen(true);
  };
  const handleCloseDialog = () => setDialogOpen(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateProduct = () => {
    const errors = {};
    if (!form.name) errors.name = "Name required";
    if (!form.price || isNaN(Number(form.price)))
      errors.price = "Valid price required";
    if (!form.category) errors.category = "Category required";
    return errors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateProduct();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    try {
      let url = "http://localhost:5000/products";
      let method = "POST";
      if (editingProduct) {
        url += `/${editingProduct._id}`;
        method = "PUT";
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (form.image && editingProduct) {
        // Send the existing image URL for updates if no new file is selected
        formData.append("image", form.image);
      }

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbar(editingProduct ? "Product updated!" : "Product added!");
      setDialogOpen(false);
      fetchProducts();
    } catch (err) {
      setSnackbar("Error: " + err.message);
      console.log("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSnackbar("Product deleted!");
      fetchProducts();
    } catch (err) {
      setSnackbar("Error: " + err.message);
    }
  };

  if (loading)
    return (
      <>
        <AdminNavbar tab={1} onTabChange={() => { }} onLogout={() => { }} />
        <div className="admin-root">
          <div className="manage-products-loading">
            <CircularProgress />
          </div>
        </div>
      </>
    );

  return (
    <>
      <AdminNavbar tab={1} onTabChange={() => { }} onLogout={() => { }} />
      <div className="admin-root">
        <div className="admin-content">
          <h2 className="manage-products-title">Admin - Manage Products</h2>
          <button
            className="manage-products-add-btn"
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </button>
          {error && (
            <div className="manage-products-alert">
              {error}
            </div>
          )}
          <div className="manage-products-table-container">
            <table className="manage-products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod._id}>
                    <td>
                      {prod.image && (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="manage-products-img"
                        />
                      )}
                    </td>
                    <td>{prod.name}</td>
                    <td>₱{prod.price}</td>
                    <td>{prod.category}</td>
                    <td>
                      <button
                        className="manage-products-edit-btn"
                        onClick={() => handleOpenDialog(prod)}
                      >
                        Edit
                      </button>
                      <button
                        className="manage-products-delete-btn"
                        onClick={() => handleDelete(prod._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="xs" PaperProps={{ className: 'manage-products-dialog' }}>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                fullWidth
                error={!!formErrors.name}
                helperText={formErrors.name}
                className="manage-products-input"
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                fullWidth
                error={!!formErrors.price}
                helperText={formErrors.price}
                className="manage-products-input"
              />
              <TextField
                margin="dense"
                label="Category"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                select
                fullWidth
                error={!!formErrors.category}
                helperText={formErrors.category}
                className="manage-products-input"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <label className="manage-products-upload-label">
                {editingProduct ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
              {(form.image && !imageFile) && (
                <div className="manage-products-img-preview">
                  <img
                    src={form.image}
                    alt="Current"
                    className="manage-products-img-large"
                  />
                </div>
              )}
              {imageFile && (
                <div className="manage-products-img-preview">
                  <span className="manage-products-img-caption">
                    Selected: {imageFile.name}
                  </span>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button className="manage-products-cancel-btn" onClick={handleCloseDialog}>Cancel</button>
              <button
                className="manage-products-save-btn"
                onClick={handleSave}
              >
                {editingProduct ? "Update" : "Add"}
              </button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={!!snackbar}
            autoHideDuration={2000}
            onClose={() => setSnackbar("")}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar("")}
              severity={snackbar.startsWith("Error") ? "error" : "success"}
              className="manage-products-snackbar"
            >
              {snackbar}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
