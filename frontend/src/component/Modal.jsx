import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
function Modal({ handleDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>Are you sure you want to delete this item?</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
