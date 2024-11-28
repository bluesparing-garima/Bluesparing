import React, { useState } from "react";
import logo from "../../assets/login_logo.png";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { imagePath } from "../../context/constant";
type MenuItem = {
  id: number;
  label: string;
  svgIcon?: string;
  link?: string;
  subMenu?: SubMenuItem[];
};
type SubMenuItem = {
  id: number;
  svgIcon?: string;
  label: string;
  link?: string;
};
interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SuperAdminSideBar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      link: "/#/super-admin/dashboard",
      svgIcon: "M4 6h16M4 12h16M4 18h16",
    },

    {
      id: 2,
      label: "Client",
      link: "/#/super-admin/client",
      svgIcon:
        "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
      subMenu: [
        {
          id: 21,
          label: "New Request",
          link: "/#/super-admin/client/new-rq",
          svgIcon:
            "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
        },
      ],
    },
    {
      id: 3,
      label: "Admin",
      svgIcon: "M12 6v12m6-6H6",
      subMenu: [
        {
          id: 31,
          label: "Team",
          link: "/#/team",
          svgIcon:
            "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
        },
        {
          id: 32,
          label: "Role",
          link: "/#/role",
          svgIcon:
            "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
        },
        {
          id: 33,
          label: "Menu",
          link: "/#/menu",
          svgIcon:
            "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75",
        },

        {
          id: 34,
          label: "Subscription",
          link: "/#/subscription",
          svgIcon:
            "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        },
      ],
    },
    {
      id: 4,
      label: "Notification",
      link: "/#/super-admin/notification",
      svgIcon:
        "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);
  const handleMenuItemClick = (itemId: number) => {
    setActiveMenuItem(itemId === activeMenuItem ? null : itemId);
  };

  const storedTheme: any = localStorage.getItem("user");
  const UserData = storedTheme ? JSON.parse(storedTheme) : null;
  const toggleSubMenu = (parentId: number) => {
    if (openSubMenus.includes(parentId)) {
      setOpenSubMenus(openSubMenus.filter((id) => id !== parentId));
    } else {
      setOpenSubMenus([...openSubMenus, parentId]);
    }
  };

  return (
    <div
      className={` ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 sticky  top-0  z-20 md:flex flex-col w-60 bg-white h-screen shadow-lg border-r-2 border-[#FEF9F3] transition-transform delay-150 duration-200`}
    >
      <div className="md:hidden flex w-full justify-end ">
        <IconButton onClick={() => setSidebarOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Link to="/dashboard" className="mx-1 my-2">
          <picture className="mb-1 flex flex-col justify-center items-center ">
            {UserData.companyLogo ? (
              <>
                <source
                  srcSet={`${imagePath}/${UserData.companyLogo}`}
                  type="image/png"
                />
                <img
                  src={`${imagePath}/${UserData.companyLogo}`}
                  className="w-36 h-12 mx-auto"
                  alt="company Logo"
                />
              </>
            ) : (
              <>
                <source srcSet={logo} type="image/png" />
                <img src={logo} className="w-44 mx-auto" alt="company Logo" />
              </>
            )}
          </picture>
        </Link>
        <div className="flex-1 py-7 overflow-y-auto bg-white hide-scrollbar">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={
                  activeMenuItem === item.id
                    ? "bg-safekaroDarkOrange text-white"
                    : "text-white-500"
                }
              >
                {item.subMenu ? (
                  <div className="flex flex-col mt-2 ml-3 mr-3">
                    <div
                      className={
                        activeMenuItem === item.id
                          ? "flex text-sm items-center text-white px-2 py-1 cursor-pointer hover:bg-safekaroDarkOrange hover:text-white rounded-lg"
                          : "flex text-sm items-center px-2 py-1 cursor-pointer hover:bg-safekaroDarkOrange hover:text-white rounded-lg"
                      }
                      onClick={() => toggleSubMenu(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d={item.svgIcon}
                        />
                      </svg>
                      {item.label}
                      <i
                        className={`fas fa-chevron-${
                          openSubMenus.includes(item.id) ? "up" : "down"
                        } text-sm text-gray-400 ml-auto`}
                      />
                    </div>
                    {openSubMenus.includes(item.id) && (
                      <div className="ml-6 max-h-40 overflow-y-auto">
                        <ul className="space-y-2">
                          {item.subMenu.map((subItem) => (
                            <li key={subItem.id}>
                              <a
                                href={subItem.link}
                                onClick={() => handleMenuItemClick(subItem.id)}
                                className="flex text-sm items-center px-2 py-1 text-gray-500 hover:bg-safekaroOrange hover:text-white rounded-lg"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  fill="none"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={subItem.svgIcon}
                                  />
                                </svg>
                                {subItem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={
                      activeMenuItem === item.id
                        ? "flex text-sm items-center px-2 py-1 ml-3 rounded-lg text-white hover:bg-safekaroDarkOrange hover:text-white"
                        : "flex text-sm items-center px-2 py-1 ml-3 text-black hover:bg-safekaroDarkOrange hover:text-white rounded-lg"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d={item.svgIcon}
                      />
                    </svg>
                    {item.label}
                  </a>
                )}
                <hr className="my-2 border-gray-200" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-1 flex flex-col justify-center items-center">
        <span className="text-sm font-medium text-safekarolightOrange">
          Powered By
        </span>
        <picture className="mb-1 ">
          <source srcSet={logo} type="image/png" />
          <img src={logo} className="w-44 mx-auto" alt="company Logo" />
        </picture>
      </div>
    </div>
  );
};
export default SuperAdminSideBar;
