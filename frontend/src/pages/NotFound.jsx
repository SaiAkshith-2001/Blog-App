import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "6rem" }}>
      <Paper elevation={3} sx={{ p: "2rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          404 Uh-Oh..
        </Typography>
        <Typography variant="body1" paragraph>
          Page Not Found!
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist.
        </Typography>
      </Paper>
    </Container>
  );
};

export default NotFound;
