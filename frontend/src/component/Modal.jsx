import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
function Modal({ open, setOpen, dialog, handlerFunction }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>{dialog.content}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={handlerFunction}>
          {dialog.btnName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
