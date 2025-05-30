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

function Home() {
  return (
    <div>
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        {/* Landing Section */}
        <Box
          sx={{
            background:
              "url('/chicken.jpg'), url('/desert.jpg'), url('/seafoods.jpg')",
            backgroundPosition: "left center, center center, right center",
            backgroundRepeat: "no-repeat, no-repeat, no-repeat",
            backgroundSize: "33.33% 100%, 33.33% 100%, 33.33% 100%",
            minHeight: "93vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: "rgba(45,45,45,0.7)",
              zIndex: 2,
            },
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              py: { xs: 4, md: 8 },
              textAlign: "center",
              position: "relative",
              zIndex: 3,
            }}
          >
            <Typography
              variant="h2"
              color="#ffb347"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontFamily: "inherit",
                fontSize: { xs: "4rem", md: "6rem" },
              }}
            >
              stEATgasm
            </Typography>
            <Typography
              variant="h5"
              color="#fff"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } }}
            >
              EST. 2019
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{ mt: 4, fontWeight: "bold", borderRadius: "20px" }}
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

        {/* Menu Preview */}
        <Box
          id="menu"
          sx={{
            background: "#0d0d0e",
            width: "100vw",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Container
            maxWidth={false}  // <-- here: allow full width
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              px: 2,
              width: "100%",
              py: { xs: 4, md: 8 },
            }}
          >
            <Typography
              variant="h3"
              color="#ffb347"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" }, textAlign: "center" }}
            >
              Menu Preview
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}
              justifyContent="center"
              alignItems="center"
            >
              {["/menu1.png", "/menu3.png", "/menu2.png"].map((img, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4} // 3 columns on desktop
                  key={idx}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      background: "#222",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 500,
                      width: 350,
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                      mx: "auto",
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt={`Menu ${idx + 1}`}
                      sx={{
                        maxHeight: "90%",
                        maxWidth: "90%",
                        borderRadius: 2,
                        objectFit: "contain",
                        mx: "auto",
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "center", mt: 4 }}>
  <RouterLink to="/menu" style={{ textDecoration: "none" }}>
    <Button
      variant="outlined"
      color="warning"
    >
      See Full Menu
    </Button>
  </RouterLink>
</Box>
          </Container>
        </Box>

        {/* About Us */}
        <Box
          sx={{
            background: "#3a3f5c",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <Typography variant="h3" color="#ffb347" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="#fff">
              We are a family-owned restaurant located in the heart of Nueva
              Vizcaya. Our mission is to provide a warm and welcoming atmosphere
              where everyone can enjoy delicious, home-cooked meals made from
              the freshest local ingredients.
            </Typography>
          </Container>
        </Box>

        {/* Location */}
        <Box
          sx={{
            background: "#2d2d2d",
            minHeight: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}
          >
            <Typography variant="h3" color="#ffb347" gutterBottom>
              Location
            </Typography>
            <Typography variant="body1" color="#fff" gutterBottom>
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

        {/* Socials */}
        <Box
          sx={{
            background: "#ffb347",
            minHeight: "20vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{ py: { xs: 4, md: 8 }, textAlign: "center" }}
          >
            <Typography variant="h4" color="#222" gutterBottom>
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
      </Box>
    </div>
  );
}

export default Home;
