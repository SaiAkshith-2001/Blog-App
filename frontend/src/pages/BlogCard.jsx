import React, { lazy, useState } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const CommentIcon = lazy(() => import("@mui/icons-material/Comment"));
const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
const ShareIcon = lazy(() => import("@mui/icons-material/Share"));
const FlagIcon = lazy(() => import("@mui/icons-material/Flag"));
const PushPin = lazy(() => import("@mui/icons-material/PushPin"));
function convertDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    month: "long", // Full month name
    day: "numeric", // Numeric day
    hour: "numeric", // Hour
    minute: "numeric", // Minute
    hour12: true, // 12-hour format
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      mr: 1,
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name?.split(" ")[1]?.[0] || ""}`,
  };
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out,box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[4],
  },
}));
const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});
const BlogCard = ({ post, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMoreOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };
  const handleCardClick = () => {
    navigate(`/posts/${post?._id}`);
  };
  return (
    <StyledCard onClick={handleCardClick}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(post.author?.name)} />}
        action={
          <>
            <Tooltip arrow title="More">
              <IconButton color="inherit" onClick={handleMoreOptions}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMoreOptionsClose}
            >
              <MenuItem>
                <Tooltip title="top" arrow>
                  <IconButton>
                    <PushPin />
                  </IconButton>
                </Tooltip>{" "}
                Pin
              </MenuItem>
              <MenuItem>
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => onEdit(post)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>{" "}
                Edit
              </MenuItem>
              <MenuItem>
                <Tooltip title="Delete" arrow>
                  <IconButton onClick={() => onDelete(post._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>{" "}
                Delete
              </MenuItem>
              <MenuItem>
                <Tooltip title="Share" arrow>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>{" "}
                Share
              </MenuItem>
              <MenuItem>
                {" "}
                <Tooltip title="Report" arrow>
                  <IconButton>
                    <FlagIcon />
                  </IconButton>
                </Tooltip>{" "}
                Report
              </MenuItem>
            </Menu>
          </>
        }
        title={post.author?.name}
        subheader={convertDate(post.createdAt)}
      />
      <CardMedia
        component="img"
        height="200"
        image={`https://images.unsplash.com/photo-1516414447565-b14be0adf13e`}
        alt={post.title}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {post.body?.content?.replace(/<\/?[^>]+(>|$)/g, "")}
        </Typography>
        <Stack direction="row" spacing={1}>
          {post.body?.tags &&
            post.body?.tags.map((tag) => <Chip label={tag} />)}
        </Stack>
      </StyledCardContent>
      {/* <CardActions sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Tooltip title={isLiked ? "Unlike" : "Like"} arrow>
          <IconButton onClick={() => setIsLiked(!isLiked)}>
            <FavoriteIcon sx={{ color: isLiked ? "red" : "null" }} />
          </IconButton>
          {/* {post.body.interactions.likes} 
        </Tooltip>
        <Tooltip title="Comment" arrow>
          <IconButton>
            <CommentIcon />
          </IconButton>
          {/* {post.body.interactions.comments}
        </Tooltip>
      </CardActions> */}
    </StyledCard>
  );
};

export default BlogCard;
