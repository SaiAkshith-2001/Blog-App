import React, { useState, useEffect, lazy } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  CircularProgress,
  Alert,
  Box,
  Paper,
  CardMedia,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import "react-quill/dist/quill.snow.css";
const ReactQuill = lazy(() => import("react-quill"));
const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));
const EditIcon = lazy(() => import("@mui/icons-material/Edit"));
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
const BlogPost = ({ post, onEdit, onDelete }) => (
  <StyledCard>
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
      {!post.author ? (
        ""
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
            {post.author[0]}
          </Avatar>
          <Typography
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
            gutterBottom
          >
            By {post.author}
          </Typography>
        </Box>
      )}
      <Typography variant="body2" color="text.secondary">
        {post.body.replace(/<\/?[^>]+(>|$)/g, "")}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, display: "block" }}
      >
        {!post.id ? "" : new Date(post?.id).toLocaleDateString()}
      </Typography>
    </StyledCardContent>
    <CardActions>
      <IconButton aria-label="edit" onClick={() => onEdit(post)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => onDelete(post.id)}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </StyledCard>
);

const BlogWrite = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setNewTitle] = useState("");
  const [body, setNewBody] = useState("");
  const [author, setNewAuthor] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    author: "",
    body: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getNews = async () => {
    // Simulating API call to fetch posts
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      //console.log(data);
      if (!response.ok) {
        throw new Error("please try again!");
      } else {
        setIsLoading(false);
        setPage((prevPage) => prevPage + 1);
        setPosts((prevData) => [...prevData, ...data]);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // const writeNews = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "https://jsonplaceholder.typicode.com/posts",
  //       {
  //         title,
  //         author,
  //         body,
  //       }
  //     );
  //     setIsLoading(false);
  //     const post = { ...newPost, id: Date.now() };
  //     setPosts((prev) => [post, ...prev]);
  //     setNewPost({ title: "", body: "", author: "" });
  //     setNewTitle("");
  //     setNewAuthor("");
  //     setNewBody("");
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.error("Error in fetching data, Please try again later!", err);
  //   }
  // };
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.body || !newPost.author) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    }
    const post = { ...newPost, id: Date.now() };
    setPosts((prev) => [post, ...prev]);
    setNewPost({ title: "", body: "", author: "" });
    setSnackbar({
      open: true,
      message: "Post created successfully",
      severity: "success",
    });
  };
  // const handlePostSave = () => {
  //   if (!posts.title || !posts.body) {
  //     setSnackbar({
  //       open: true,
  //       message: "Please fill all fields",
  //       severity: "error",
  //     });
  //     return;
  //   } else if (posts.id) {
  //     setPosts(posts.map((post) => (post.id === posts.id ? posts : post)));
  //     setSnackbar({
  //       open: true,
  //       message: "Post updated successfully",
  //       severity: "success",
  //     });
  //   } else {
  //     setPosts([...posts, { id: Date.now().toString() }]);
  //     setSnackbar({
  //       open: true,
  //       message: "Post created successfully",
  //       severity: "success",
  //     });
  //   }
  //   setDialogOpen(false);
  // };

  const handlePostDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
      setSnackbar({
        open: true,
        message: "Post deleted successfully",
        severity: "success",
      });
    }
  };
  const handlePostEdit = (post) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleUpdatePost = () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === editingPost.id ? editingPost : p))
    );
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: "Post updated successfully",
      severity: "success",
    });
  };

  // const handlePostEdit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/posts",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application /json",
  //         },
  //         body: JSON.stringify({
  //           id,
  //           title,
  //           body,
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     // console.log(data);
  //     if (!response.ok) {
  //       throw new Error("please try again!");
  //     } else {
  //       setIsLoading(false);
  //       setCurrentPost({ id: data.id, title: data.title, body: data.body });
  //       setDialogOpen(true);
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.error("Error in fetching data, Please try again later!", err);
  //   }
  // };
  // useEffect(() => {
  //   handlePostEdit();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (body) => {
    setNewPost((prev) => ({ ...prev, body }));
  };

  return (
    <>
      <Container sx={{ py: 8, my: 4 }} maxWidth="md">
        <Paper sx={{ p: 2, mb: 2 }} elevation={3}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={newPost.author}
            onChange={handleInputChange}
            margin="normal"
          />
          <ReactQuill
            theme="snow"
            value={newPost.body}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
              // sx={{ mb: 4, textTransform: "none" }}
            >
              Create Post
            </Button>
          </Box>
        </Paper>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {posts &&
              posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={4}>
                  <BlogPost
                    post={post}
                    onEdit={handlePostEdit}
                    onDelete={handlePostDelete}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editingPost?.title || ""}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, title: e.target.value }))
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={editingPost?.author || ""}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, author: e.target.value }))
            }
            margin="normal"
          />
          <ReactQuill
            theme="snow"
            value={editingPost?.body || ""}
            onChange={(body) => setEditingPost((prev) => ({ ...prev, body }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdatePost}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogWrite;
