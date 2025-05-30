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
import AdminSidebar from "./AdminSidebar";

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

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://kantokusinafinal.vercel.app/products");
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

  // Open dialog for add or edit
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

  // Form change handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Validation
  const validateProduct = () => {
    const errors = {};
    if (!form.name) errors.name = "Name required";
    if (!form.price || isNaN(Number(form.price)))
      errors.price = "Valid price required";
    if (!form.category) errors.category = "Category required";
    return errors;
  };

  // Add or Edit product
  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateProduct();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    try {
      let url = "https://kantokusina.vercel.app/products";
      let method = "POST";
      if (editingProduct) {
        url += `/${editingProduct._id}`;
        method = "PUT";
      }
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      if (imageFile) formData.append("image", imageFile);
      // Only send image if new or changed
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to save product");
      setSnackbar(editingProduct ? "Product updated!" : "Product added!");
      setDialogOpen(false);
      fetchProducts();
    } catch (err) {
      setSnackbar("Error: " + err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`https://kantokusina.vercel.app/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSnackbar("Product deleted!");
      fetchProducts();
    } catch (err) {
      setSnackbar("Error: " + err.message);
    }
  };

  if (loading)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#23263a" }}>
      <AdminSidebar tab={2} onTabChange={() => {}} onLogout={() => {}} />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography
          variant="h4"
          sx={{ color: "#ffb347", mb: 3, fontWeight: "bold" }}
        >
          Admin - Manage Products
        </Typography>
        <Button
          variant="contained"
          sx={{
            mb: 2,
            background: "#ffb347",
            color: "#23263a",
            fontWeight: "bold",
          }}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TableContainer
          component={Paper}
          sx={{ background: "#264653", color: "#fff", mb: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#ffb347" }}>Image</TableCell>
                <TableCell sx={{ color: "#ffb347" }}>Name</TableCell>
                <TableCell sx={{ color: "#ffb347" }}>Price</TableCell>
                <TableCell sx={{ color: "#ffb347" }}>Category</TableCell>
                <TableCell sx={{ color: "#ffb347" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod._id}>
                  <TableCell>
                    {prod.image && (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>₱{prod.price}</TableCell>
                  <TableCell>{prod.category}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => handleOpenDialog(prod)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(prod._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
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
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2 }}
            >
              {editingProduct ? "Change Image" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {(form.image && !imageFile) && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={form.image}
                  alt="Current"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
            {imageFile && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Selected: {imageFile.name}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                background: "#ffb347",
                color: "#23263a",
                fontWeight: "bold",
              }}
            >
              {editingProduct ? "Update" : "Add"}
            </Button>
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
            sx={{ width: "100%" }}
          >
            {snackbar}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ManageProducts;
