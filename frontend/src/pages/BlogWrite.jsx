import React, { useState, useEffect, lazy, useContext } from "react";
import {
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
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  Chip,
} from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";
import axios from "axios";
import BlogCard from "./BlogCard";
import { ImageResize } from "quill-image-resize-module-ts";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import { Quill } from "react-quill";
Quill.register("modules/imageResize", ImageResize);
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
  imageResize: true,
};
const BlogWrite = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const [posts, setPosts] = useState([]);
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    author: { name: "", email: "" },
    body: { category: "", content: "", tags: [] },
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
      const response = await axios.get(
        "http://localhost:5000/api/posts/write",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data.posts;
      // console.log(data);
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
        "http://localhost:5000/api/posts/write",
        {
          title: newPost.title,
          author: { name: newPost.author.name, email: newPost.author.email },
          body: {
            tags: chips,
            category: newPost.body.category,
            content: newPost.body.content,
            // content: newPost.body.content.replace(/<\/?[^>]+(>|$)/g, ""),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response.data);
      const post = { ...newPost, id: Date.now() };
      setPosts((prev) => [post, ...prev]);
      setSnackbar({
        open: true,
        message: "Post created successfully!",
        severity: "success",
      });
      setNewPost({
        title: "",
        author: { name: "", email: "" },
        body: { category: "", content: "", tags: [] },
      });
      setError(false);
      setChips([]);
      setInputValue("");
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
  // const handlePostDelete = (id) => {
  //   setPosts(posts.filter((post) => post.id !== id));
  //   setSnackbar({
  //     open: true,
  //     message: "Post deleted successfully",
  //     severity: "success",
  //   });
  //   setDeleteDialogOpen(false);
  // };
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
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
      author: {
        ...prev.author,
        [name]: value,
      },
      body: {
        ...prev.body,
        [name]: value,
      },
    }));
  };
  const handleContentChange = (content) => {
    setNewPost((prev) => ({
      ...prev,
      body: {
        ...prev.body,
        content: content,
      },
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!chips.includes(inputValue.trim())) {
        setChips((prev) => [...prev, inputValue.trim()]);
        setInputValue("");
      }
    } else if (event.key === "Backspace" && !inputValue && chips.length > 0) {
      setChips((prev) => prev.slice(0, -1));
    }
  };

  const handleDelete = (chipToDelete) => {
    setChips((prev) => prev.filter((chip) => chip !== chipToDelete));
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          my: "6rem",
          // height: `calc(100vh - 64px)`,
          // "@media (min-width: 768px)": {
          //   height: `calc(100vh - 80px)}`,
          // },
        }}
        maxWidth="md"
      >
        <Paper
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 4,
          }}
          elevation={3}
        >
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
            label="Author Name"
            name="name"
            value={newPost.author.name}
            onChange={handleInputChange}
            margin="normal"
            error={newPost.author.name.trim() === "" ? error : null}
            helperText={newPost.author.name.trim() === "" ? helperText : null}
          />
          <TextField
            fullWidth
            required
            label="Author Email"
            name="email"
            value={newPost.author.email}
            onChange={handleInputChange}
            margin="normal"
            error={newPost.author.email.trim() === "" ? error : null}
            helperText={newPost.author.email.trim() === "" ? helperText : null}
          />
          <Box
            sx={{
              py: 2,
              display: "flex",
              flex: 1,
            }}
          >
            <FormControl
              fullWidth
              error={newPost.body.category.trim() === "" ? error : null}
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newPost.body.category}
                label="Category"
                required
                onChange={handleInputChange}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Innovations"> Innovations </MenuItem>
                <MenuItem value="Current Affairs">Current Affairs</MenuItem>
                <MenuItem value="AI">AI</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Trends">Trends</MenuItem>
              </Select>
              {newPost.body.category.trim() === "" && error ? (
                <FormHelperText>this is a required field</FormHelperText>
              ) : null}
            </FormControl>
          </Box>
          <Box sx={{ pb: 2 }}>
            <TextField
              fullWidth
              required
              label="Tags"
              name="tags"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              margin="normal"
              placeholder={
                chips?.length === 0 ? "Type and press Enter to add tags" : ""
              }
              error={chips?.length === 0 ? error : null}
              helperText={chips?.length === 0 ? helperText : null}
              sx={{ borderRadius: 4, pb: 0.75 }}
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                pointerEvents: "none",
                "& .MuiChip-root": {
                  pointerEvents: "auto",
                },
              }}
            >
              {chips?.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip}
                  onDelete={() => handleDelete(chip)}
                />
              ))}
            </Box>
          </Box>
          <ReactQuill
            theme="snow"
            modules={modules}
            required
            value={newPost.body.content}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
            style={{
              height: "300px",
            }}
            className="customEditor"
          />
        </Paper>
        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </Box>
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
                    // onDelete={() => setDeleteDialogOpen(true)}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      {/* <Dialog
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
      </Dialog> */}
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
            value={editingPost?.author.name}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, author: e.target.value }))
            }
            fullWidth
            margin="normal"
            required
            error={editingPost?.author.name === "" ? error : null}
            helperText={editingPost?.author.name === "" ? helperText : null}
          />
          <ReactQuill
            theme="snow"
            required
            value={editingPost?.body.content || ""}
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
