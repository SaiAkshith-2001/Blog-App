import { useState, useEffect, lazy, useContext } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Chip,
  InputLabel,
  TextField,
} from "@mui/material";
import { SnackbarContext } from "../context/SnackbarContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "react-quill/dist/quill.bubble.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../components/ConfirmationBox";
const ReactQuill = lazy(() => import("react-quill"));

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
  ],
};

const BlogWrite = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState({
    title: "",
    author: { name: "", email: "" },
    body: { category: "", content: "", tags: [] },
  });
  const [newPost, setNewPost] = useState({
    title: "",
    author: { name: "", email: "" },
    body: { category: "", content: "", tags: [] },
  });
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [deletePost, setDeletePost] = useState(null);
  const url = process.env.REACT_APP_API_URL;

  const fetchPosts = async () => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      const response = await axios.get(`${url}/api/posts/write`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.posts;
      setIsLoading(false);
      setPosts([...data]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in fetching data, Please try again later!", error);
      setSnackbar({
        open: true,
        message: "Something went wrong Please try again later!",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    fetchPosts();
    return () => {
      // Reset all state
      setNewPost({
        title: "",
        author: { name: "", email: "" },
        body: { category: "", content: "", tags: [] },
      });
      setEditingPost({
        title: "",
        author: { name: "", email: "" },
        body: { category: "", content: "", tags: [] },
      });
      setChips([]);
      setInputValue("");
      setError(false);
      setHelperText("");
      // Close any open dialogs
      setDialogOpen(false);
      setDeleteDialogOpen(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    try {
      setIsLoading(true);
      //eslint-disable-next-line
      const response = await axios.post(
        `${url}/api/posts/write`,
        {
          title: newPost.title,
          author: {
            name: user?.given_name ?? user?.username,
            email: user?.email,
          },
          body: {
            tags: chips,
            category: newPost.body.category,
            content: newPost.body.content,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const post = { ...newPost, id: Date.now() };
      setIsLoading(false);
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
      navigate("/read");
      setError(false);
      setChips([]);
      setInputValue("");
      setHelperText("");
    } catch (error) {
      setIsLoading(false);
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
  // eslint-disable-next-line
  const handleDeleteDialog = (post) => {
    setDeletePost(post);
    setDeleteDialogOpen(true);
  };

  const handlePostDelete = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${url}/api/posts/read/post/${deletePost._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        setPosts(posts.filter((post) => post._id !== deletePost._id));
        setIsLoading(false);
        setDeleteDialogOpen(false);
        setDeletePost(null);
        setSnackbar({
          open: true,
          message: "Post deleted successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setDeleteDialogOpen(false);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Something went wrong Please try again later!",
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setIsLoading(false);
      setDeletePost(null);
    }
  };

  // const handlePostEdit = (post) => {
  //   setEditingPost(post);
  //   setDialogOpen(true);
  // };

  const handleUpdatePost = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (!editingPost?.title?.trim() || !editingPost?.body?.content?.trim()) {
      setError(true);
      setHelperText("This is required field");
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${url}/api/posts/read/post/${editingPost._id}`,
        {
          title: editingPost.title.trim(),
          author: {
            name: editingPost.author.name.trim(),
            email: editingPost.author.email.trim(),
          },
          body: {
            tags: editingPost.body.chips,
            category: editingPost.body.category.trim(),
            content: editingPost.body.content.trim(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === editingPost._id ? editingPost : post
          )
        );
        setIsLoading(false);
        setDialogOpen(false);
        setSnackbar({
          open: true,
          message: "Post updated successfully",
          severity: "success",
        });
        setError(false);
        setHelperText("");
      }
    } catch (error) {
      console.error("Error in fetching data, Please try again later!", error);
      if (error.response && error.response.status === 429) {
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
    } finally {
      setIsLoading(false);
      setDialogOpen(false);
    }
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
  const categoryOptions = [
    "General",
    "Innovations",
    "Current Affairs",
    "AI",
    "Web Development",
    "Marketing",
    "Trends",
  ];
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          my: "6rem",
        }}
        maxWidth="md"
      >
        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Create Post"
            )}
          </Button>
        </Box>
        <TextField
          fullWidth
          required
          autoFocus
          placeholder="Title"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          margin="normal"
          error={newPost.title.trim() === "" ? error : null}
          helperText={newPost.title.trim() === "" ? helperText : null}
          sx={{ outline: "none", fontWeight: "1.5rem" }}
        />
        {/* <TextField
          fullWidth
          required
          placeholder="Author Name"
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
          placeholder="Author Email"
          name="email"
          value={newPost.author.email}
          onChange={handleInputChange}
          margin="normal"
          error={newPost.author.email.trim() === "" ? error : null}
          helperText={newPost.author.email.trim() === "" ? helperText : null}
        /> */}
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
              label="Category"
              value={newPost.body.category}
              required
              onChange={handleInputChange}
              sx={{
                borderRadius: "40px",
              }}
            >
              {categoryOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
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
          theme="bubble"
          modules={modules}
          value={newPost.body.content}
          onChange={handleContentChange}
          placeholder="Write your post content here..."
          className="customEditor"
        />
        {/* {isLoading ? (
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
                    onDelete={handleDeleteDialog}
                  />
                </Grid>
              ))}
          </Grid>
        )} */}
      </Container>
      <ConfirmationBox
        title="Confirm Delete"
        message="Are you sure you want to delete this post? Deletion is not reversible,
                and the post will be completely deleted."
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        isLoading={isLoading}
        onConfirm={handlePostDelete}
        ConfirmButton="Delete"
      />
      <Dialog
        fullWidth
        maxWidth="md"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            placeholder="Title"
            value={editingPost?.title}
            onChange={(e) =>
              setEditingPost((prev) => ({ ...prev, title: e.target.value }))
            }
            margin="normal"
            error={editingPost?.title === "" ? error : null}
            helperText={editingPost?.title === "" ? helperText : null}
          />
          {/* <TextField
            placeholder="Author"
            value={editingPost?.author.name}
            onChange={(e) =>
              setEditingPost((prev) => ({
                ...prev,
                author: { ...prev.author, name: e.target.value },
              }))
            }
            fullWidth
            margin="normal"
            required
            error={editingPost?.author.name === "" ? error : null}
            helperText={editingPost?.author.name === "" ? helperText : null}
          /> 
          <TextField
            fullWidth
            required
            value={editingPost?.body.tags}
            onChange={(e) =>
              setEditingPost((prev) => ({
                ...prev,
                body: { ...prev.body, tags: e.target.value },
              }))
            }
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
          </Box> */}
          <ReactQuill
            theme="bubble"
            modules={modules}
            value={editingPost?.body.content || ""}
            // required
            // style={{
            //   border: "none",
            //   // height: "300px",
            // }}
            className="customEditor"
            onChange={(content) =>
              setEditingPost((prev) => ({
                ...prev,
                body: {
                  ...prev.body,
                  content,
                },
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdatePost} disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default BlogWrite;
