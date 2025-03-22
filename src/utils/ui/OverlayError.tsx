import { Alert, AlertTitle, IconButton, Slide } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface OverlayErrorProps {
  title: string;
  msg: string;
  onClose: () => void;
}

const OverlayError: FC<OverlayErrorProps> = ({ title, msg, onClose }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Alert
            severity="error"
            className="bg-white p-6 rounded-2xl shadow-2xl border border-red-400 w-[90%] sm:w-[400px] animate-fade-in"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <AlertTitle className="text-lg font-bold">{title}</AlertTitle>
            <p className="text-sm">{msg}</p>
          </Alert>
      
      </Slide>
    </div>
  );
};

export default OverlayError;
