import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  const navigate = useNavigate();
  const redirectToRead = () => {
    navigate("/read");
  };
  const redirectToWrite = () => {
    navigate("/write");
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: { xs: "center", lg: "left" },
          width: { xs: "100%", lg: "50%" },
          mt: { xs: 4, lg: -8 },
        }}
      >
        <Typography variant="h3" component="h3" sx={{ color: "text.primary" }}>
          Welcome to the Blog Application{" "}
          <span
            style={{
              fontWeight: "600",
              textDecoration: "underline",
              textDecorationColor: "primary.main",
            }}
          >
            <Typewriter
              words={[
                "Read.",
                "Write.",
                "Share.",
                "Content.",
                "Create.",
                "Browse.",
                "Explore.",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-start" },
            marginTop: { xs: 4, lg: 8 },
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={redirectToRead}
            sx={{ textTransform: "none", width: { xs: "100%", sm: "auto" } }}
          >
            Get Started <ArrowForwardIcon />
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            onClick={redirectToWrite}
            sx={{ textTransform: "none", width: { xs: "100%", sm: "auto" } }}
          >
            Write
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          mt: { xs: 4, lg: 0 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
          alt="Cover Page"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "400px",
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
