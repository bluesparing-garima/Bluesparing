import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SwipeableTemporaryDrawer: React.FC<ModalProps> = ({
  open,
  setOpen,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#E3F2FD", // Light Orange Background
          borderRadius: "12px",
          boxShadow: "0px 0px 10px 2px #F2DDD4",
        },
      }}
    >
      {/* Close Button */}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => setOpen(false)} size="large">
          <CloseIcon
            fontSize="large"
            className="text-gray-700 hover:text-gray-900"
          />
        </IconButton>
      </Box>

      {/* Modal Content */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default SwipeableTemporaryDrawer;
