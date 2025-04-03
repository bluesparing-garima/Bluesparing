import { Button, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface CustomButtonProps {
    title?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomIconButton: React.FC<CustomButtonProps> = ({
  onClick,
  type = "button",
  icon,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Button
    className="w-10 h-10 flex justify-center items-center md:w-9 md:h-9 rounded-lg shadow-[0_0_5px_1px_#F2DDD4] border-gray-100 hover:bg-gray-200 transition duration-200"
    disableRipple
      disableElevation
      sx={{
        minWidth: 0,
        width: "100%", // Button ko full width dene ke liye
        height: "100%", // Button ko full height dene ke liye
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #D1D5DB",
        backgroundColor: "transparent",
        "&:hover": { backgroundColor: "transparent" },
        "&:focus": { outline: "none" },
      }}
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
    >
      {isLoading ? <CircularProgress className="w-6 h-6" /> : icon}
    </Button>
  );
};

export default CustomIconButton;
