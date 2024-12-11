import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function Modal({ post, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Tooltip title="Close" arrow>
        <IconButton onClick={() => setOpen(false)} color="inherit">
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Box>
        <DialogTitle>{post.title}</DialogTitle>
      </Box>
      <Box>
        <DialogContent>{post.author}</DialogContent>
      </Box>
      <Box>
        <DialogContent>{post.body}</DialogContent>
      </Box>
      <DialogActions>
        <Tooltip title="Edit" arrow>
          <IconButton aria-label="edit" onClick={() => onEdit(post)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton aria-label="delete" onClick={() => onDelete(post.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
