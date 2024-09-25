import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";

const BlogPost = styled(Card)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(4),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const BlogRead = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPostDetails = async () => {
    // Simulating API call to fetch posts
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error("please try again!");
      } else {
        setIsLoading(false);
        setPostDetails(data);
      }
    } catch (err) {
      console.error("Error in fetching data, Please try again later!", err);
    }
  };
  useEffect(() => {
    getPostDetails();
  }, []);

  //   const handleScroll = useCallback(() => {
  //     // console.log(window.innerHeight);
  //     // console.log(document.documentElement.scrollTop);
  //     // console.log(document.documentElement.scrollHeight);
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight //
  //     ) {
  //       if (!isLoading) {
  //         getNews();
  //       }
  //     }
  //   }, [isLoading]);
  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [isLoading]);

  return (
    <Container maxWidth="md" style={{ marginTop: "1rem" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          {postDetails &&
            postDetails.map((item) => (
              <Stack key={item.id}>
                <BlogPost>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h5"
                      color="secondary"
                      gutterBottom
                    >
                      User {item.id} {item.name}
                    </Typography>
                    <Typography color="info" gutterBottom>
                      Email ID:{item.email}
                    </Typography>
                    <Typography variant="body2" color="text" gutterBottom>
                      {item.body}
                    </Typography>
                  </CardContent>
                </BlogPost>
              </Stack>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogRead;
