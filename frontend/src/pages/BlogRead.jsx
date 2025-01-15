import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Container,
  Grid,
  Fab,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

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
      const response = await axios.get("http://localhost:5000/api/posts/read");
      const data = response.data.posts;
      // console.log(data);
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
        placeholder="Search all topics"
        variant="outlined"
        fullWidth
        margin="normal"
        autoFocus
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        onChange={handleSearch}
      />
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Grid container spacing={4}>
          {filteredPosts &&
            filteredPosts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogCard post={post} />
              </Grid>
            ))}
        </Grid>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
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
