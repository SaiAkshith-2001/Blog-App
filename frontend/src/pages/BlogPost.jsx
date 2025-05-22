import React, { useState, useEffect, lazy, useContext } from "react";
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
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import axios from "axios";
import { convertDate } from "../utils";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "../index.css";
import {
  TwitterShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { SnackbarContext } from "../context/SnackbarContext";
const ContentCopyRoundedIcon = lazy(() =>
  import("@mui/icons-material/ContentCopyRounded")
);
const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const SendRoundedIcon = lazy(() => import("@mui/icons-material/SendRounded"));
const CommentIcon = lazy(() => import("@mui/icons-material/Comment"));
const BlogPost = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const currentUrl = window.location.href;
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const handleMoreOptions = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };
  const getPostDetails = async () => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      const response = await axios.get(`${url}/api/posts/read/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.post;
      setIsLoading(false);
      setPostDetails(data);
    } catch (error) {
      setIsLoading(false);
      navigate("/");
      console.error("Error in fetching data, Please try again later!", error);
      if (error.response && error.response.status === 401) {
        setSnackbar({
          open: true,
          message: "Invalid username (or) password , Please verify!",
          severity: "error",
        });
      }
    }
  };
  useEffect(() => {
    getPostDetails();
    // eslint-disable-next-line
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
    //     "a",
    //     "img",
    //     "h1",
    //     "h2",
    //   ], // Allow only these tags
    //   ALLOWED_ATTR: ["href", "class", "src", "spellcheck"], // Allow only these attributes
  });
  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
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
          {/* <Typography variant="subtitle2">
            {convertDate(postDetails?.createdAt)}
          </Typography> */}
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
              <Tooltip title="More" arrow>
                <IconButton color="inherit" onClick={handleMoreOptions}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMoreOptionsClose}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem onClick={copyToClipboard}>
                  <ListItemIcon>
                    <ContentCopyRoundedIcon />
                  </ListItemIcon>
                  {isCopied ? "Copied!" : "Copy Link"}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <TwitterShareButton
                      url={currentUrl}
                      title="Check this out!"
                    >
                      <XIcon size={24} round />
                    </TwitterShareButton>
                  </ListItemIcon>
                  Share on X
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <LinkedinShareButton url={currentUrl}>
                      <LinkedinIcon size={24} round />
                    </LinkedinShareButton>
                  </ListItemIcon>
                  Share on LinkedIn
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Divider />
          <Typography
            className="quill-content"
            sx={{
              textAlign: "justify",
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
              postDetails?.body?.tags.map((tag, index) => (
                <Chip label={tag} key={index} sx={{ fontWeight: "bold" }} />
              ))}
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 1,
            }}
          >
            <Typography
              component="span"
              sx={{
                height: 4,
                width: 4,
                backgroundColor: "#000",
                borderRadius: 2,
                mx: 1,
              }}
            ></Typography>
            <Typography
              component="span"
              sx={{
                height: 4,
                width: 4,
                backgroundColor: "#000",
                borderRadius: 2,
                mx: 1,
              }}
            ></Typography>
            <Typography
              component="span"
              sx={{
                height: 4,
                width: 4,
                backgroundColor: "#000",
                mx: 1,
                borderRadius: 2,
              }}
            ></Typography>
          </Box>
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
            {postDetails?.body?.interactions?.comments?.map((i, index) => (
              <React.Fragment>
                <Box
                  key={index}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <Avatar>{i?.username?.split(" ")[0][0]}</Avatar>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {i?.username}
                  </Typography>
                  <Typography key={i.id}>{i?.content}</Typography>
                  <Typography variant="subtitle2">
                    {convertDate(i?.createdAt)}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
};

export default BlogPost;
