import { lazy, useState } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Stack,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils";
import { format } from "date-fns";
// import DOMPurify from "dompurify";

const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
// const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
// const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
const ShareIcon = lazy(() => import("@mui/icons-material/Share"));
const FlagIcon = lazy(() => import("@mui/icons-material/Flag"));
const PushPin = lazy(() => import("@mui/icons-material/PushPin"));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  borderRadius: 16,
  transition: "transform 0.2s ease-in-out,box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const BlogCard = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMoreOptions = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    navigate(`/posts/${post?._id}`);
  };

  const renderContent = (content, wordLimit) => {
    const words = content?.split(" ");
    if (content?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  // const sanitizedContent = DOMPurify.sanitize(post?.body?.content, {
  //   USE_PROFILES: { html: true },
  // });

  const extractCoverFromPost = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const coverImg = doc.querySelector("img");
    return coverImg?.src;
  };

  return (
    <StyledCard variant="outlined" onClick={handleCardClick}>
      <CardHeader
        avatar={
          <Avatar src={post?.avatar} {...stringAvatar(post.author?.name)} />
        }
        action={
          <>
            <IconButton color="inherit" onClick={handleMoreOptions}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMoreOptionsClose}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItem>
                <ListItemIcon>
                  <PushPin />
                </ListItemIcon>
                Pin
              </MenuItem>
              {/* <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(post);
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                Delete
              </MenuItem> */}
              <MenuItem>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                Share
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                Report
              </MenuItem>
            </Menu>
          </>
        }
        title={post.author?.name}
        subheader={format(post?.createdAt, "MMM dd, y")}
      />
      {extractCoverFromPost(post?.body?.content) && (
        <CardMedia
          component="img"
          height="200"
          image={extractCoverFromPost(post?.body?.content)}
          alt={post?.title}
        />
      )}
      <StyledCardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {renderContent(post?.title, 10)}
        </Typography>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
          dangerouslySetInnerHTML={{
            __html: renderContent(sanitizedContent, 5),
          }}
        /> */}
        <Stack
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: "100%",
            flexDirection: { xs: "column", md: "row" },
            py: 2,
            gap: 0.75,
          }}
        >
          {post?.body?.tags &&
            post?.body?.tags.map((tag, index) => (
              <Chip label={tag} key={index} sx={{ textOverflow: "ellipsis" }} />
            ))}
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
};

export default BlogCard;
