import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { imagePath } from "../../context/constant";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/login_logo.png"; // fallback logo
import CustomIconButton from "../Dashboard/data/CustomIconButton";

const ClientHeader = () => {
  const navigate = useNavigate();
  const storedTheme: any = localStorage.getItem("user");
  const user = storedTheme ? JSON.parse(storedTheme) : null;

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/"); // or "/login" based on your app
  };

  return (
    <div className="flex justify-between items-center px-8 py-3 bg-white border-b">
      <div className="flex items-center gap-2">
        <img
          src={user?.companyLogo ? `${imagePath}/${user.companyLogo}` : logo}
          onError={(e) => (e.currentTarget.src = logo)}
          alt="Company Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        <CustomIconButton
          title="Logout"
          onClick={handleLogout}
          icon={<LogoutIcon className="w-6 h-6 text-red-500" />}
        />
      </div>
    </div>
  );
};

export default ClientHeader;
