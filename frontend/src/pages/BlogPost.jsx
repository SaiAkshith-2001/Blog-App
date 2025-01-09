import React, { useState, useEffect, lazy } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Divider,
  Avatar,
  Chip,
  TextField,
} from "@mui/material";
import axios from "axios";
import { convertDate } from "./BlogCard";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
const ShareIcon = lazy(() => import("@mui/icons-material/Share"));
const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const SendRoundedIcon = lazy(() => import("@mui/icons-material/SendRounded"));
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
  const sanitizedContent = DOMPurify.sanitize(postDetails?.body?.content, {
    USE_PROFILES: { html: true },
    //   ALLOWED_TAGS: [
    //     "b",
    //     "p",
    //     "u",
    //     "i",
    //     "em",
    //     "strong",
    //     "a",
    //     "img",
    //     "span",
    //     "h1",
    //     "h2",
    //     "h3",
    //     "h4",
    //     "h5",
    //     "h6",
    //     "tabel",
    //     "tr",
    //     "td",
    //     "th",
    //     "ul",
    //     "ol",
    //     "li",
    //     "br",
    //     "pre",
    //     "blockquote",
    //   ], // Allow only these tags
    //   ALLOWED_ATTR: ["href", "class", "src", "spellcheck"], // Allow only `href` attributes
  });
  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", lineHeight: 1.6 }}
            gutterBottom
          >
            {postDetails?.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Georgia, Times, 'Times New Roman', serif",
              fontSize: "1.25rem",
              lineHeight: 1.6,
              py: 0.75,
            }}
          >
            {postDetails?.body?.category}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            spacing={2}
            sx={{ my: 0.5, justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
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
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography
                color="textSecondary"
                sx={{
                  fontStyle: "italic",
                  p: 0.75,
                }}
                gutterBottom
              >
                By {postDetails?.author?.name}
              </Typography>
              <Tooltip title="Share" arrow>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <Divider />
          <Typography
            sx={{
              fontFamily: "Georgia, Times, 'Times New Roman', serif",
              fontSize: "1.25rem",
              lineHeight: 1.6,
              py: 0.75,
            }}
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              pb: 2,
              gap: 0.75,
            }}
          >
            {postDetails?.body?.tags &&
              postDetails?.body?.tags.map((tag) => (
                <Chip label={tag} key={tag} />
              ))}
          </Stack>
          <Divider />
          <TextField
            fullWidth
            required
            label="Write your comment here"
            name="comment"
            //  value={newPost.comment}
            //  onChange={handleInputChange}
            margin="normal"
            //  error={newPost.comment.trim() === "" ? error : null}
            //  helperText={newPost.comment.trim() === "" ? helperText : null}
            InputProps={{
              endAdornment: (
                <Tooltip title="Send" arrow>
                  <IconButton color="primary" type="submit">
                    <SendRoundedIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <Box sx={{ p: 2 }}>
            {postDetails?.body?.interactions?.comments?.map((i) => (
              <>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar>{i?.username?.split(" ")[0][0]}</Avatar>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {i?.username}
                  </Typography>
                  <Typography key={i.id}>{i?.content}</Typography>
                  <Typography variant="subtitle2">
                    {convertDate(i?.createdAt)}
                  </Typography>
                </Box>
              </>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default BlogPost;
