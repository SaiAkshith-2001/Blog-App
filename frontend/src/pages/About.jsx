import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "6rem" }}>
      <Paper elevation={3} sx={{ p: "2rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Our Blog
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our blog! We are passionate about sharing insightful
          articles, news, and stories on a variety of topics. Our mission is to
          provide valuable content that informs, entertains, and inspires our
          readers.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for visiting our blog. We hope you enjoy reading our posts
          as much as we enjoy creating them. If you have any questions or
          feedback, feel free to reach out to us. Happy reading!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
