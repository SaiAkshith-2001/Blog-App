import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Paper,
  Snackbar,
  styled,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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
      image="https://images.unsplash.com/photo-1501504905252-473c47e087f8"
      alt={post.title}
    />
    <StyledCardContent>
      <Typography gutterBottom variant="h5" component="h2">
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
      <Typography variant="body2" color="textSecondary">
        {post.body.replace(/<\/?[^>]+(>|$)/g, "")}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
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

const NoteEditor = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    if (!title || !content) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "error",
      });
      return;
    } else {
      const newPost = {
        id: Date.now(),
        title,
        author,
        body: content,
      };

      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      setSnackbar({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });

      setTitle("");
      setAuthor("");
      setContent("");
    }
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
  const handleEdit = (post) => {
    setTitle(post.title);
    setAuthor(post.author);
    setContent(post.body);
  };
  const handlePostEdit = (post) => {
    setEditingPost(post);
    setDialogOpen(true);
  };
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setSnackbar({
      open: true,
      message: "Post deleted successfully",
      severity: "success",
    });
  };

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 2, marginTop: "8rem" }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
            required
          />
          <ReactQuill
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Write your post content here..."
            sx={{ my: "2rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: "2rem" }}
          >
            Save
          </Button>
        </Paper>
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
          <Grid container spacing={4}>
            {posts &&
              posts?.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <BlogPost
                    key={post.id}
                    post={post}
                    onEdit={handlePostEdit}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
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

export default NoteEditor;
