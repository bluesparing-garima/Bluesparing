import toast, { Toast } from "react-hot-toast";
import { NotificationImportant as NotificationIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect } from "react";

interface CustomToastProps {
  t: Toast; // Toast instance for dismiss control
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ t, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss(t.id);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [t.id]);

  return (
    <div
      className={`${
        t.visible ? "animate-fadeIn" : "animate-fadeOut"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          {/* Avatar as first letter */}
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
              <NotificationIcon />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-end p-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <CancelIcon className="text-[red]" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
