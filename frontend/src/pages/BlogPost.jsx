import { useState, useEffect, lazy, useContext } from "react";
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
  Breadcrumbs,
} from "@mui/material";
import { format } from "date-fns";
import { useParams, useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import "../index.css";
import {
  TwitterShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { SnackbarContext } from "../context/SnackbarContext";
import postService from "../services/postService";
const ContentCopyRoundedIcon = lazy(() =>
  import("@mui/icons-material/ContentCopyRounded")
);
const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const SendRoundedIcon = lazy(() => import("@mui/icons-material/SendRounded"));
const CommentIcon = lazy(() => import("@mui/icons-material/Comment"));
const AccessTimeIcon = lazy(() => import("@mui/icons-material/AccessTime"));
const NavigateNext = lazy(() => import("@mui/icons-material/NavigateNext"));

const BlogPost = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const currentUrl = window.location.href;
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
  const getPostFeeds = async () => {
    setIsLoading(true);
    try {
      const response = await postService.getPostById(id);
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
          message: error.response.data.message,
          severity: "error",
        });
      }
    }
  };
  useEffect(() => {
    getPostFeeds();
    // eslint-disable-next-line
  }, [id]);

  const sanitizedContent = DOMPurify.sanitize(postDetails?.body?.content, {
    USE_PROFILES: { html: true },
  });

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  };
  const breadcrumbs = [
    <Typography
      sx={{ cursor: "pointer" }}
      component={Link}
      key="1"
      color="inherit"
      to="/"
    >
      Home
    </Typography>,
    <Typography key="2" color="inherit">
      {postDetails?.title}
    </Typography>,
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: "6rem" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack sx={{ mx: "2rem" }} spacing={2}>
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <Divider sx={{ marginTop: "0.5rem" }} />
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", lineHeight: 1.6 }}
            gutterBottom
          >
            {postDetails?.title}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "1rem",
            }}
          >
            <Typography>
              {postDetails?.createdAt
                ? format(postDetails?.createdAt, "MMM dd, y")
                : "loading..."}
            </Typography>
            <Typography
              component="span"
              sx={{
                height: 4,
                width: 4,
                backgroundColor: "#000",
                borderRadius: 2,
                mx: 1,
              }}
            />
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              <AccessTimeIcon fontSize="small" />
              {calculateReadingTime(sanitizedContent) <= 1
                ? "1 mintue read"
                : `${calculateReadingTime(sanitizedContent)} mintues read`}
            </Typography>
            <Typography
              component="span"
              sx={{
                height: 4,
                width: 4,
                backgroundColor: "#000",
                borderRadius: 2,
                mx: 1,
              }}
            />
            <Typography sx={{ fontWeight: "bold" }}>
              {postDetails?.body?.category}
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: "0.5rem" }} />
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
              <>
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
                    {format(i?.createdAt, "MMM dd, y")}
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
