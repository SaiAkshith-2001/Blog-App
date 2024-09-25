// src/components/MarkdownEditor.js
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Container } from "@mui/material";

const MarkdownEditor = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  return (
    <Container sx={{ marginTop: "6rem" }}>
      <MdEditor
        value={content}
        style={{ height: "500px" }}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        onChange={handleEditorChange}
      />
    </Container>
  );
};

export default MarkdownEditor;
