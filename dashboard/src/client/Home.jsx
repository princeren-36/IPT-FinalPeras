import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Link,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import NavBar from "./NavBar";
import { Link as RouterLink } from 'react-router-dom';
import "../styles/Home.css";
import "../styles/HomeMenuPreview.css";

function Home() {
  return (
    <div>
      <Box className="landing-section">
        <Container maxWidth="md" className="landing-container">
          <Typography variant="h2" className="landing-title">
            stEATgasm
          </Typography>
          <Typography variant="h5" className="landing-subtitle">
            EST. 2019
          </Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            className="landing-menu-btn"
            onClick={() => {
              const menuSection = document.getElementById("menu");
              if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View Menu
          </Button>
        </Container>
      </Box>

      <Box id="menu" className="home-menu-preview-section">
        <Container maxWidth={false} className="home-menu-preview-container">
          <Typography variant="h3" className="home-menu-preview-title">
            Menu Preview
          </Typography>
          <Grid container spacing={3} className="home-menu-preview-grid">
            {["/menu1.png", "/menu3.png", "/menu2.png"].map((img, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} className="home-menu-preview-grid-item">
                <Card className="home-menu-preview-card">
                  <Box
                    component="img"
                    src={img}
                    alt={`Menu ${idx + 1}`}
                    className="home-menu-preview-img"
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className="home-menu-preview-link-box">
            <RouterLink to="/menu" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="warning" className="home-menu-preview-link-btn">
                See Full Menu
              </Button>
            </RouterLink>
          </Box>
        </Container>
      </Box>
      
      <Box className="home-about-section">
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography className="home-about-title" variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography className="home-about-text">
            We are a family-owned restaurant located in the heart of Nueva
            Vizcaya. Our mission is to provide a warm and welcoming atmosphere
            where everyone can enjoy delicious, home-cooked meals made from
            the freshest local ingredients.
          </Typography>
        </Container>
      </Box>

      <Box className="home-location-section">
        <Container
          maxWidth="md"
          sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}
        >
          <Typography className="home-location-title" variant="h3" gutterBottom>
            Location
          </Typography>
          <Typography className="home-location-text" variant="body1" gutterBottom>
            <RoomIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Bonifacio Street, District IV, Bayombong, Nueva Vizcaya,
            Philippines
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

      <Box className="home-socials-section">
        <Container
          maxWidth="md"
        >
          <Typography variant="h4" color="#222" gutterBottom sx={{ textAlign: "center" }}>
            Connect with us!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Link
              href="https://www.facebook.com/kantokusina"
              target="_blank"
              rel="noopener"
              color="#222"
            >
              <FacebookIcon sx={{ fontSize: 40 }} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener"
              color="#222"
            >
              <InstagramIcon sx={{ fontSize: 40 }} />
            </Link>
            <Link
              href="mailto:jactubaran07@gmail.com"
              target="_blank"
              rel="noopener"
              color="#222"
            >
              <EmailIcon sx={{ fontSize: 40 }} />
            </Link>
          </Box>
          <Typography
            variant="h4"
            color="#222"
            gutterBottom
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <PhoneIcon sx={{ fontSize: 40 }} />
            0906 964 5470
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default Home;
