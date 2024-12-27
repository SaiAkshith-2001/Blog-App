import React, { useState, useEffect, lazy, useContext } from "react";
import {
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";
import axios from "axios";
import BlogCard from "./BlogCard";
import "react-quill/dist/quill.snow.css";
const ReactQuill = lazy(() => import("react-quill"));
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-2" }, { indent: "+2" }],
    // [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
};
const BlogWrite = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    author: "",
    body: "",
  });
  const fetchPosts = async () => {
    setIsLoading(true);
    // try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
    //   );
    //   const data = await response.json();
    //   //console.log(data);
    //   if (!response.ok) {
    //     throw new Error("please try again!");
    //   } else {
    //     setIsLoading(false);
    //     setPosts((prevData) => [...prevData, ...data]);
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    //   console.error("Error in fetching data, Please try again later!", err);
    // }
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      const response = await axios.get("http://localhost:5000/api/write", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.posts;
      setIsLoading(false);
      setPosts([...data]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleCreatePost = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      const response = await axios.post(
        "http://localhost:5000/api/write",
        {
          title: newPost.title,
          author: newPost.author,
          body: newPost.body.replace(/<\/?[^>]+(>|$)/g, ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      const post = { ...newPost, id: Date.now() };
      setPosts((prev) => [post, ...prev]);
      setSnackbar({
        open: true,
        message: "Post created successfully!",
        severity: "success",
      });
      setNewPost({ title: "", body: "", author: "" });
      setError(false);
      setHelperText("");
    } catch (error) {
      console.error("Something went wrong", error);
      if (error.response && error.response.status === 400) {
        setError(true);
        setHelperText("this is required field");
        setSnackbar({
          open: true,
          message: "Please fill all fields!",
          severity: "error",
        });
      } else if (error.response && error.response.status === 429) {
        setSnackbar({
          open: true,
          message: "Too many requests, please try again later.",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong Please try again later!",
          severity: "error",
        });
      }
    }
  };

  const handlePostDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    setSnackbar({
      open: true,
      message: "Post deleted successfully",
      severity: "success",
    });
    setDeleteDialogOpen(false);
  };
  const handlePostEdit = (post) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleUpdatePost = () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === editingPost.id ? editingPost : p))
    );
    if (!editingPost?.title || !editingPost?.body || !editingPost?.author) {
      setError(true);
      setHelperText("this is required field");
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    }
    setDialogOpen(false);
    setSnackbar({
      open: true,
      message: "Post updated successfully",
      severity: "success",
    });
    setError(false);
    setHelperText("");
  };
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
            required
            autoFocus
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            margin="normal"
            error={newPost.title.trim() === "" ? error : null}
            helperText={newPost.title.trim() === "" ? helperText : null}
          />
          <TextField
            fullWidth
            required
            label="Author"
            name="author"
            value={newPost.author}
            onChange={handleInputChange}
            margin="normal"
            error={newPost.author.trim() === "" ? error : null}
            helperText={newPost.author.trim() === "" ? helperText : null}
          />
          <ReactQuill
            theme="snow"
            modules={modules}
            required
            value={newPost.body}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
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
                  <BlogCard
                    post={post}
                    onEdit={handlePostEdit}
                    onDelete={() => setDeleteDialogOpen(true)}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={handlePostDelete} color="error" variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            label="Title"
            value={editingPost?.title}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, title: e.target.value }))
            }
            margin="normal"
            error={editingPost?.title === "" ? error : null}
            helperText={editingPost?.title === "" ? helperText : null}
          />
          <TextField
            label="Author"
            value={editingPost?.author}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, author: e.target.value }))
            }
            fullWidth
            margin="normal"
            required
            error={editingPost?.author === "" ? error : null}
            helperText={editingPost?.author === "" ? helperText : null}
          />
          <ReactQuill
            theme="snow"
            required
            value={editingPost?.body || ""}
            onChange={(body) => setEditingPost((prev) => ({ ...prev, body }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdatePost}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogWrite;
