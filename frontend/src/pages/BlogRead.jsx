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
  Button,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
const BlogRead = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getNews = async () => {
    if (!hasMore) return;
    // Simulating API call to fetch posts
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      //  console.log(data);
      if (!response.ok) {
        throw new Error("please try again!");
      } else {
        setIsLoading(false);
        setNewsData((prevData) => [...prevData, ...data]);
        if (data.length < 10) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };
  useEffect(() => {
    getNews();
  }, [page]);

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
                  </StyledCardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={Link}
                      to={`/posts/${item.id}`}
                    >
                      Read More
                    </Button>
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
        <IconButton color="inherit" component={Link} to="/write">
          <AddIcon />
        </IconButton>
      </StyledFab>
    </Container>
  );
};

export default BlogRead;
