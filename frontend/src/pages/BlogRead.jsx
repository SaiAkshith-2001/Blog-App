import { useState, useEffect } from "react";
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
  Pagination,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const BlogRead = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const skip = searchParams.get("skip") || 0;
  const limit = searchParams.get("limit") || 10;

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/posts/read?skip=${skip}&limit=${limit}`
      );
      const data = response.data.posts;
      setIsLoading(false);
      setNewsData((prevData) => [...prevData, ...data]);
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [skip, limit]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // console.log(window.innerHeight);
  //     // console.log(document.documentElement.scrollTop);
  //     // console.log(document.documentElement.scrollHeight);
  //     try {
  //       if (
  //         window.innerHeight + document.documentElement.scrollTop + 1 >=
  //         document.documentElement.scrollHeight
  //       ) {
  //         setIsLoading(true);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredPosts = newsData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container
      sx={{
        my: "6rem",
      }}
    >
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
      <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
        <Grid container spacing={4}>
          {filteredPosts &&
            filteredPosts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogCard post={post} />
              </Grid>
            ))}
        </Grid>
        <Box
          sx={{
            margin: "auto",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              my: "2rem",
            }}
            skip={skip}
            count={10}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/read?skip=${skip}&limit=${limit}`}
                {...item}
              />
            )}
          />
        </Box>
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
