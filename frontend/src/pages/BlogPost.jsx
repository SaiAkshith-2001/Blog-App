import React, { useState, useEffect } from "react";
import PostComment from "./PostComment";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  CardActions,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";

const BlogPostStyled = styled(Card)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(4),
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const BlogPost = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getPostDetails = async () => {
    // Simulating API call to fetch posts
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
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
  const handleEditPost = () => {
    console.log("edit post");
  };
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
  //
  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [isLoading]);

  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <BlogPostStyled>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  {postDetails.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {postDetails.body}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <IconButton aria-label="edit" onClick={handleEditPost}>
                  <EditIcon /> 
                </IconButton> */}
              </CardActions>
            </BlogPostStyled>
            <Typography variant="body2" color="textSecondary">
              Comment(s)
            </Typography>
            <PostComment />
          </Grid>
        </>
      )}
    </Container>
  );
};

export default BlogPost;
