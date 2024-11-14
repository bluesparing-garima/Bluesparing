import { useNavigate } from 'react-router-dom';
const useLogoClickHandler = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const storedTheme = localStorage.getItem("user");
    const userData = storedTheme ? JSON.parse(storedTheme) : null;
    if (userData && userData.role) {
      switch (userData.role.toLowerCase()) {
        case "admin":
          navigate("/dashboard");
          break;
        case "operation":
          navigate("/operationdashboard");
          break;
        case "booking":
          navigate("/booking-dashboard");
          break;
        case "account":
          navigate("/accountdashboard");
          break;
        default:
          navigate("/partnerdashboard");
          break;
      }
    } else {
      navigate("/login");
    }
  };
  return handleClick;
};
export default useLogoClickHandler;
