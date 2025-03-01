import React, { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/login_logo.png";
import { SafeKaroUser } from "../../context/constant";
import { imagePath } from "../../context/constant";

interface MenuItem {
  id: string;
  label: string;
  svgIcon?: string;
  link?: string;
  role: string;
  isLocked: boolean;
  subMenu?: MenuItem[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuItems: MenuItem[];
}

const SidebarUi: FC<SidebarProps> = ({
  menuItems,
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;

  const generateDashBoardLink = () => {
    const role = userData?.role.toLowerCase();
    switch (role) {
      case "hr":
        return "/hr/dashboard";
      case "booking":
        return "/booking-dashboard";
      case "account":
        return "/accountdashboard";
      case "operation":
        return "/operationdashboard";
      case "rm":
        return "/rm/dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.link) {
      navigate(item.link);
    } else {
      setActiveMenuItem(item.id === activeMenuItem ? null : item.id);
    }
  };

  const toggleSubMenu = (parentId: string) => {
    if (openSubMenus.includes(parentId)) {
      setOpenSubMenus(openSubMenus.filter((id) => id !== parentId));
    } else {
      setOpenSubMenus([...openSubMenus, parentId]);
    }
  };

  const location = useLocation();

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const isActive = location.pathname === item.link;
  
      return (
        <li key={item.id} className="relative max-h-100 scroll-hidden">
          <div
            className={`flex items-center px-2 py-1 text-[15px] cursor-pointer rounded-lg sticky top-0 z-10 
              ${isActive ? "bg-safekaroDarkOrange text-white" : "text-black hover:bg-safekaroDarkOrange hover:text-white"}
            `}
            onClick={() => {
              if (item.subMenu && item.subMenu.length > 0) {
                toggleSubMenu(item.id);
              } else {
                handleMenuItemClick(item);
              }
            }}
          >
            {item.svgIcon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.svgIcon} />
              </svg>
            )}
            <span className="text-sm">{item.label}</span>
            {item.subMenu && item.subMenu.length > 0 && (
              <i className={`fas fa-chevron-${openSubMenus.includes(item.id) ? "up" : "down"} text-sm text-gray-400 ml-auto`} />
            )}
          </div>
          {item.subMenu && openSubMenus.includes(item.id) && (
            <ul className="ml-4 mt-2 space-y-1 px-1 border-l border-gray-200 pl-2 overflow-y-auto scrollbar .overflow max-h-[40vh]">
              {renderMenuItems(item.subMenu)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 sticky top-0 z-20 md:flex flex-col w-60 bg-white h-screen shadow-lg border-r-2 border-[#FEF9F3] transition-transform delay-150 duration-200`}
    >
      <Link
        to={generateDashBoardLink()}
        className="flex items-center justify-center h-16 mt-1 bg-white"
      >
        <picture className="mb-1 flex flex-col justify-center items-center">
        <img
      src={userData?.companyLogo ? `${imagePath}/${userData.companyLogo}` : logo}
      className="w-36 h-12 mx-auto"
      alt="Company Logo"
      onError={(e) => (e.currentTarget.src = logo)} // Agar image load fail ho toh default logo dikhaye
    />
        </picture>
      </Link>
      <div className="md:hidden flex w-full justify-end">
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 py-7 overflow-y-auto scrollbar">
        <ul className="space-y-2 ml-1 mr-1">{renderMenuItems(menuItems)}</ul>
      </div>
    </div>
  );
};

export default SidebarUi;