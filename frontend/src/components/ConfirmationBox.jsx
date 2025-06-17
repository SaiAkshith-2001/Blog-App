import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

function ConfirmationBox({
  title,
  message,
  isLoading,
  open,
  onClose,
  onConfirm,
  ConfirmButton,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="outlined"
          disabled={isLoading}
          // sx={{
          //   "&:hover": {
          //     color: "white",
          //     backgroundColor: "red",
          //   },
          // }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            ConfirmButton
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationBox;
