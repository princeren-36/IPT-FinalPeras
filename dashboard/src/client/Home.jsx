import React from "react";
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia, Link } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NavBar from "./NavBar";
import "../styles/Home.css";

function Home() {
  const menuItems = [];

  return (
    <div>
      <Box sx={{ width: "100%", minHeight: "100vh", p: 0, m: 0 }}>
        {/* Landing Section */}
        <Box sx={{
          background: "#2d2d2d",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}>
            <Typography variant="h2" color="#ffb347" gutterBottom sx={{
              fontWeight: 'bold',
              fontFamily: 'inherit',
              fontSize: { xs: "2rem", md: "3rem" }
            }}>
              Mama's Legacy to Feed.
            </Typography>
            <Typography variant="h5" color="#fff" gutterBottom sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
              Discover the best dishes from the heart of Nueva Vizcaya!
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{ mt: 4, fontWeight: "bold", borderRadius: "20px" }}
              href="#menu"
            >
              View Menu
            </Button>
          </Container>
          <Container sx={{ width: "100%", height: "100%" }}>
          <img
            src="../src/images/kantokusina.png"
            alt="Restaurant"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          </Container>
          
        </Box>

        {/* Our Story */}
        <Box sx={{ background: "#3a3f5c", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h3" color="#ffb347" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" color="#fff">
              Nueva Vizcaya Eats was founded in 2020 with a passion for bringing authentic local flavors to our community. Inspired by the rich culture and culinary traditions of Nueva Vizcaya, we strive to serve dishes that feel like home.
            </Typography>
          </Container>
        </Box>

        {/* Menu Preview */}
        <Box id="menu" sx={{
          background: "#264653",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h3" color="#ffb347" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}>
              Menu Preview
            </Typography>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {menuItems.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ background: "#355c60", color: "#fff", borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={item.photo}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h5" sx={{ fontSize: { xs: "1.1rem", md: "1.3rem" } }}>{item.name}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>{item.description}</Typography>
                      <Typography variant="subtitle1" color="#ffb347">{item.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button variant="outlined" color="warning" href="/menu">
                See Full Menu
              </Button>
            </Box>
          </Container>
        </Box>

        {/* About Us */}
        <Box sx={{ background: "#3a3f5c", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h3" color="#ffb347" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="#fff">
              We are a family-owned restaurant located in the heart of Nueva Vizcaya. Our mission is to provide a warm and welcoming atmosphere where everyone can enjoy delicious, home-cooked meals made from the freshest local ingredients.
            </Typography>
          </Container>
        </Box>

        {/* Location */}
        <Box sx={{ background: "#2d2d2d", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}>
            <Typography variant="h3" color="#ffb347" gutterBottom>
              Location
            </Typography>
            <Typography variant="body1" color="#fff" gutterBottom>
              <RoomIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Bonifacio Street, District IV, Bayombong, Nueva Vizcaya, Philippines
            </Typography>
            <Box sx={{ mt: 2 }}>
              <iframe
                title="Nueva Vizcaya Eats Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0000000000005!2d121.158878!3d16.4876646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3390450f5549c5a1%3A0x7b46a3a61d581ad4!2sKanto%20Kusina!5e0!3m2!1sen!2sph!4v1716830000000!5m2!1sen!2sph"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Container>
        </Box>

        {/* Socials */}
        <Box sx={{ background: "#ffb347", minHeight: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}>
            <Typography variant="h4" color="#222" gutterBottom>
              Connect with us!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
              <Link href="https://www.facebook.com/kantokusina" target="_blank" rel="noopener" color="#222">
                <FacebookIcon sx={{ fontSize: 40 }} />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank" rel="noopener" color="#222">
                <InstagramIcon sx={{ fontSize: 40 }} />
              </Link>
              <Link href="mailto:jactubaran07@gmail.com" target="_blank" rel="noopener" color="#222">
                <EmailIcon sx={{ fontSize: 40 }} />
              </Link>
            </Box>
            <Typography variant="h4" color="#222" gutterBottom sx={{ display: "flex", justifyContent: "center"}}>
              <PhoneIcon sx={{ fontSize: 40 } } />0906 964 5470
            </Typography>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
