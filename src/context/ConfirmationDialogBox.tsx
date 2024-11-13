import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  data: any; 
  onAction: (data: any) => void;
}

const ConfirmationDialogBox: React.FC<MyDialogProps> = ({
  open,
  onClose,
  title,
  content,
  data,
  onAction,
}) => {
  const handleAction = () => {
    onAction(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data}</pre>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          className="bg-safekaroDarkBlue"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          style={
            title !== "Payment Details"
              ? { display: "visible" }
              : { display: "none" }
          }
          onClick={handleAction}
          color="success"
          className="text-safekaroDarkOrange"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogBox;
