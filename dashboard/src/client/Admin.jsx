import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Admin() {
  return (
    <>
      {isLoggedIn && (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: '#23263a' }}>
          <AdminSidebar tab={tab} onTabChange={setTab} onLogout={handleLogout} />
          <Box sx={{ flexGrow: 1, ml: { xs: 0, md: '220px' }, p: 3 }}>
            <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 } }}>
              <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, background: '#3a3f5c', color: '#fff', borderRadius: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: "#ffb347", fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
                  Admin Dashboard
                </Typography>
                <Box hidden={tab !== 0}>
                  <Dashboard />
                </Box>
                <Box hidden={tab !== 1}>
                  <ManageUsers
                    users={users}
                    onUserDelete={handleUserDelete}
                    userSnackbar={userSnackbar}
                    setUserSnackbar={setUserSnackbar}
                  />
                </Box>
                <Box hidden={tab !== 2}>
                  <ManageProducts
                    products={products}
                    onOpenProductDialog={handleOpenProductDialog}
                    onProductDelete={handleProductDelete}
                    productDialogOpen={productDialogOpen}
                    onCloseProductDialog={handleCloseProductDialog}
                    editingProduct={editingProduct}
                    productForm={productForm}
                    onProductFormChange={handleProductFormChange}
                    onProductSave={handleProductSave}
                    productSnackbar={productSnackbar}
                    setProductSnackbar={setProductSnackbar}
                  />
                </Box>
              </Paper>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Admin;