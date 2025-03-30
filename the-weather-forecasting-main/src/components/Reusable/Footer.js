import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Email, WhatsApp, GitHub, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#1e1e1e",
        color: "white",
        textAlign: "center",
        padding: "1.5rem 0",
        mt: "auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        <IconButton
          component={Link}
          href="mailto:somesh180309@gmail.com.com"
          target="_blank"
          color="inherit"
        >
          <Email />
        </IconButton>

        <IconButton
          component={Link}
          href="https://wa.me/9026406277?text=Hello%20there!%20I%20have%20a%20query."
          target="_blank"
          color="inherit"
        >
          <WhatsApp />
        </IconButton>

        <IconButton
          component={Link}
          href="https://github.com/sammy0318"
          target="_blank"
          color="inherit"
        >
          <GitHub />
        </IconButton>

        <IconButton
          component={Link}
          href="https://www.instagram.com/sammy._._.03/"
          target="_blank"
          color="inherit"
        >
          <Instagram />
        </IconButton>
      </Box>

      <Typography variant="body2">
  &copy; {new Date().getFullYear()} All rights reserved.
</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Made with ❤️ by Sammy
      </Typography>
    </Box>
  );
};

export default Footer;
