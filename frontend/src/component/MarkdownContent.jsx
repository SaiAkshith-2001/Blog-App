import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
const MarkdownEditor = () => {
  const [markDownContent, setMarkDownContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("markDownContent");
    if (savedContent) {
      setMarkDownContent(savedContent);
    }
  }, []);

  const handleChange = (event) => {
    setMarkDownContent(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("markdownContent", markDownContent);
    alert("Content saved!");
  };

  const handleClear = () => {
    setMarkDownContent("");
    localStorage.removeItem("markDownContent");
    alert("Content cleared!");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Markdown Editor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Markdown Input"
            value={markDownContent}
            onChange={handleChange}
            multiline
            rows={10}
            variant="outlined"
            fullWidth
          />
          <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClear}>Clear</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid #ddd",
              padding: 2,
              borderRadius: 1,
              minHeight: "200px",
            }}
          >
            <ReactMarkdown>{markDownContent}</ReactMarkdown>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarkdownEditor;