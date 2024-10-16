import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import axios from "axios";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
const AskAI = () => {
  const [prompt, setPrompt] = useState("");
  const [promptResponse, setPromptResponse] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/askai", {
        prompt,
      });
      // const data = await response.json();
      console.log(response.data);
      setPromptResponse(response.data);
    } catch (error) {
      console.error("failed to fetch", error);
    }
  };
  return (
    <Container>
      <Box
        sx={{
          alignItems: "center",
          mt: "8rem",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h4">
          What can I help with?
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your query..."
            variant="outlined"
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            margin="normal"
            autoFocus
            InputProps={{
              endAdornment: (
                <IconButton color="primary" type="submit">
                  <SendRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      </Box>
      <Typography sx={{ fontSize: "0.8rem", textAlign: "center" }}>
        AI can make mistakes. Check important inforamtion.
      </Typography>
      {promptResponse && (
        <Paper elevation={3} sx={{ p: "2rem" }}>
          <Typography variant="body1" paragraph>
            {promptResponse}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default AskAI;
