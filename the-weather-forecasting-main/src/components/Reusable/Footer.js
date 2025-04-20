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
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        {[
          {
            icon: <Email />,
            link: "mailto:somesh180309@gmail.com",
          },
          {
            icon: <WhatsApp />,
            link: "https://wa.me/9026406277?text=Hello%20there!%20I%20have%20a%20query.",
          },
          {
            icon: <GitHub />,
            link: "https://github.com/sammy0318",
          },
          {
            icon: <Instagram />,
            link: "https://www.instagram.com/sammy._._.03/",
          },
        ].map((item, idx) => (
          <IconButton
            key={idx}
            component={Link}
            href={item.link}
            target="_blank"
            sx={{
              color: "inherit",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#333333",
                transform: "scale(1.1)",
              },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
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
