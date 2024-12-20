import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Fab,
  CircularProgress,
  CardActions,
  Box,
  IconButton,
  CardMedia,
  Tooltip,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { Link } from "react-router-dom";
import axios from "axios";
const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
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
const BlogRead = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const getNews = async () => {
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/read");
      const data = response.data.posts;
      console.log(data);
      setIsLoading(false);
      setNewsData((prevData) => [...prevData, ...data]);
      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };
  useEffect(() => {
    getNews();
  }, []);
  // }, [page]);
  const handleScroll = () => {
    // console.log(window.innerHeight);
    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement.scrollHeight);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredPosts = newsData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ marginTop: "6rem" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search blogs..."
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ display: "flex", alignItems: "center" }}
        onChange={handleSearch}
      />
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Grid container spacing={4}>
          {filteredPosts &&
            filteredPosts?.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://images.unsplash.com/photo-1516414447565-b14be0adf13e`}
                    alt={item.title}
                  />
                  <StyledCardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.body}
                    </Typography>
                    <Box
                      sx={{
                        pt: 2,
                        display: "flex",
                      }}
                    >
                      <Avatar {...stringAvatar(item.author)} />
                      <Typography
                        color="textSecondary"
                        sx={{ fontStyle: "italic" }}
                        gutterBottom
                      >
                        By {item.author}
                      </Typography>
                    </Box>
                  </StyledCardContent>
                  <CardActions>
                    <Tooltip title="comment" arrow>
                      <IconButton
                        aria-label="comments"
                        component={Link}
                        to={`/posts/${item._id}`}
                      >
                        <CommentRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
        </Grid>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
      <StyledFab color="primary" aria-label="add">
        <Tooltip title="New Post" arrow>
          <IconButton color="inherit" component={Link} to="/write">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </StyledFab>
    </Container>
  );
};

export default BlogRead;
