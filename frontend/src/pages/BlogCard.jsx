import React, { lazy, useState } from "react";
import {
  Typography,
  CardActions,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

const FavoriteIcon = lazy(() => import("@mui/icons-material/Favorite"));
const CommentIcon = lazy(() => import("@mui/icons-material/Comment"));
const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
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

const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.15s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));
const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});
const BlogCard = ({ post, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMoreOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreOptionsClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar {...stringAvatar(post.author)} />}
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
              <MenuItem>Insights</MenuItem>
              <MenuItem>Share</MenuItem>
              <MenuItem>Report</MenuItem>
            </Menu>
          </>
        }
        title={post.author}
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
          {post.body.replace(/<\/?[^>]+(>|$)/g, "")}
        </Typography>
      </StyledCardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Tooltip title="Like" arrow>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Comment" arrow>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" arrow>
          <IconButton onClick={() => onEdit(post)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton onClick={() => onDelete(post.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

export default BlogCard;
