import React, { useState, useEffect, lazy } from "react";
import BlogComment from "./BlogComment";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
const ShareIcon = lazy(() => import("@mui/icons-material/Share"));
const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const CommentIcon = lazy(() => import("@mui/icons-material/Comment"));

const BlogPost = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getPostDetails = async () => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/read/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.post;
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
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
              {postDetails.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {postDetails.body?.content}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
                  <IconButton onClick={() => setIsLiked(!isLiked)}>
                    <FavoriteIcon sx={{ color: isLiked ? "red" : "null" }} />
                  </IconButton>
                  {/* {post.body.interactions.likes} */}
                </Tooltip>
                <Tooltip title="Comment" arrow>
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                  {/* {post.body.interactions.comments} */}
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    fontStyle: "italic",
                    p: 0.75,
                  }}
                  gutterBottom
                >
                  By {postDetails.author?.name}
                </Typography>
                <Tooltip title="Share" arrow>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Paper>
          <BlogComment />
        </>
      )}
    </Container>
  );
};

export default BlogPost;
