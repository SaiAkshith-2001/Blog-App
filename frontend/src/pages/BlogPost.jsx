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
  Box,
} from "@mui/material";
import axios from "axios";
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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/read/post/${id}`
      );
      const data = response.data.post;
      console.log(data);
      setIsLoading(false);
      setPostDetails(data);
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
                <Typography
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontStyle: "italic",
                    p: 0.75,
                  }}
                  gutterBottom
                >
                  By {postDetails.author}
                </Typography>
              </CardContent>
            </BlogPostStyled>
            <PostComment />
          </Grid>
        </>
      )}
    </Container>
  );
};

export default BlogPost;
