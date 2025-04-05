import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

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
          position: "absolute",
          top: -20,
          width: "90%", // Adjust width as per screen
           // Adjust height as per screen
          // maxWidth: "600px",
          // maxHeight: "90vh",
        },
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => setOpen(false)} size="large">
            <CloseIcon fontSize="large" className="text-gray-700 hover:text-gray-900" />
          </IconButton>
        </Box>

        {/* Modal Content */}
        <DialogContent>{children}</DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default SwipeableTemporaryDrawer;
