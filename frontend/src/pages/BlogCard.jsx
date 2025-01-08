import React, { lazy, useState } from "react";
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
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
const MoreVertIcon = lazy(() => import("@mui/icons-material/MoreVert"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
const ShareIcon = lazy(() => import("@mui/icons-material/Share"));
const FlagIcon = lazy(() => import("@mui/icons-material/Flag"));
const PushPin = lazy(() => import("@mui/icons-material/PushPin"));
export const convertDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "short", // Full month name
    day: "numeric", // Numeric day
    // hour: "numeric", // Hour
    // minute: "numeric", // Minute
    // hour12: true, // 12-hour format
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};
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
const BlogCard = ({ post, onEdit, onDelete }) => {
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
  const renderContent = (content) => {
    const wordLimit = 30;
    const words = content.split(" ");
    if (content.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };
  return (
    <StyledCard variant="outlined" onClick={handleCardClick}>
      <CardHeader
        avatar={<Avatar {...stringAvatar(post.author?.name)} />}
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
                <IconButton>
                  <PushPin />
                </IconButton>
                Pin
              </MenuItem>
              <MenuItem>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(post);
                  }}
                >
                  <EditIcon />
                </IconButton>
                Edit
              </MenuItem>
              <MenuItem>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(post._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                Delete
              </MenuItem>
              <MenuItem>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                Share
              </MenuItem>
              <MenuItem>
                <IconButton>
                  <FlagIcon />
                </IconButton>
                Report
              </MenuItem>
            </Menu>
          </>
        }
        title={post.author?.name}
        subheader={format(post?.createdAt)}
        // subheader={convertDate(post?.createdAt)}
      />
      <CardMedia
        component="img"
        height="200"
        image={`https://images.unsplash.com/photo-1516414447565-b14be0adf13e`}
        alt={post.title}
      />
      <StyledCardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {renderContent(post.body?.content?.replace(/<\/?[^>]+(>|$)/g, ""))}
        </Typography>
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
            post?.body?.tags.map((tag) => (
              <Chip label={tag} key={tag} sx={{ textOverflow: "ellipsis" }} />
            ))}
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
};

export default BlogCard;
