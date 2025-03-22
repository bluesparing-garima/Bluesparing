import { CircularProgress } from "@mui/material";
const OverlayLoader = () => {
  return (
    <div className="absolute inset-0 bg-transparent bg-opacity-80 flex items-center justify-center">
        
      <CircularProgress size={60} thickness={4} className="text-blue-500" />
    </div>
  );
};

export default OverlayLoader;