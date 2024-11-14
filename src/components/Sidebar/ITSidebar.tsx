import React, { useState } from "react";
import logo from "../../assets/login_logo.png";
import { IconButton } from "@mui/material";
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
const ITSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      link: "/#/it/dashboard",
      svgIcon: "M4 6h16M4 12h16M4 18h16",
    },
    {
      id: 2,
      label: "Mark Attendance",
      link: "/#/mark-attendance",
      svgIcon:
        "M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z",
    },
    {
      id: 3,
      label: "Holiday List",
      link: "/#/hr/holidays",
      svgIcon:
        "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
    },
  ];
  const storedTheme: any = localStorage.getItem("user");
  const UserData = storedTheme ? JSON.parse(storedTheme) : null;
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

  const handleMenuItemClick = (itemId: number) => {
    setActiveMenuItem(itemId === activeMenuItem ? null : itemId);
  };

  const toggleSubMenu = (parentId: number) => {
    if (openSubMenus.includes(parentId)) {
      setOpenSubMenus(openSubMenus.filter((id) => id !== parentId));
    } else {
      setOpenSubMenus([...openSubMenus, parentId]);
    }
  };


  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 sticky  top-0  z-20 md:flex flex-col w-60 bg-white h-screen shadow-lg border-r-2 border-[#FEF9F3] transition-transform delay-150 duration-200`}
    >
      <div className="md:hidden flex w-full justify-end">
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
      <div className="mx-1">
          <picture className="mb-1 flex flex-col justify-center items-center ">
            {UserData.companyLogo ? (
              <>
                <source srcSet={`${imagePath}/${UserData.companyLogo}`} type="image/png" />
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
        </div>
        <div className="flex-1 py-7 overflow-y-auto bg-white">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={
                  activeMenuItem === item.id
                    ? "bg-safekaroDarkBlue text-white"
                    : "text-gray-500"
                }
              >
                {item.subMenu ? (
                  <div className="flex flex-col mt-2 ml-3 mr-3">
                    <div
                      className="flex text-sm items-center px-2 py-1 cursor-pointer hover:bg-safekaroDarkBlue hover:text-white rounded-lg"
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
                                className="flex text-sm items-center px-2 py-1 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white rounded-lg"
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
                    className="flex text-sm items-center px-2 py-1 ml-3 text-gray-500 hover:bg-safekaroDarkBlue hover:text-white rounded-lg"
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

export default ITSidebar;
