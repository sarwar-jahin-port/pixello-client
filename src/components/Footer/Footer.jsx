import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Linkedin as LinkedIn,
  Twitter,
  Mail,
  Instagram,
  ExternalLink,
} from "lucide-react";
import FooterLink from "./FooterLink";
import SocialButton from "./SocialButton";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#202157",
        color: "white",
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section with Email Subscription */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: "white", mb: 1 }}
            >
              Welcome to Our Pixello Hub
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Best Pixello Autopilot
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              width: isMobile ? "100%" : "auto",
              maxWidth: "400px",
            }}
          >
            <TextField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "4px",
                  color: "white",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#10B981",
                "&:hover": {
                  bgcolor: "#0E9F6E",
                },
                ml: 1,
                px: 3,
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Logo and Contact Section */}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                "& span": {
                  color: "#10B981",
                },
              }}
            >
              PIXELLO
            </Typography>

            <Typography
              variant="body2"
              sx={{ mt: 2, color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
            >
              Pixello solutions LLC, 2001
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}
            >
              anderkilla, chittagong, Bangladesh
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}
            >
              sarwarjahin@gmail.com
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <SocialButton icon={<LinkedIn size={18} />} />
              <SocialButton icon={<Twitter size={18} />} />
              <SocialButton icon={<Mail size={18} />} />
              <SocialButton icon={<Instagram size={18} />} />
            </Box>
          </Grid>

          {/* Quick Menu Section */}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Menu
            </Typography>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Affiliate</FooterLink>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </Grid>

          {/* Compare Section */}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Compare
            </Typography>
            <FooterLink href="#">Buffer Alternative</FooterLink>
            <FooterLink href="#">Hootsuite Alternative</FooterLink>
            <FooterLink href="#">Later ANErative</FooterLink>
            <FooterLink href="#">Sprout Alternative</FooterLink>
            <FooterLink href="#">Others</FooterLink>
          </Grid>

          {/* Legal Section */}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Legal
            </Typography>
            <FooterLink href="#">Terms & Conditions</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Support</FooterLink>
            <FooterLink href="#">FAQ</FooterLink>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 2,
            borderTop: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Copyright© 2023 Roblox Solutions LLC
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
