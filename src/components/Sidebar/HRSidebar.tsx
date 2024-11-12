import React, { useState } from "react";
import logo from "../../assets/login_logo.png";
import useLogoClickHandler from "../../utils/useLogoClickHandler";
import { IconButton } from "@mui/material";

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
const HRSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      link: "/#/hr/dashboard",
      svgIcon: "M4 6h16M4 12h16M4 18h16",
    },
    {
      id: 2,
      label: "Team Management",
      svgIcon:
        "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
      subMenu: [
        {
          id: 21,
          label: "Team",
          link: "/#/team",
          svgIcon:
            "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
        },
        {
          id: 20,
          label: "Role",
          link: "/#/role",
          svgIcon: "M4 6h16M4 12h16M4 18h16",
        },
        {
          id: 32,
          label: "Attendance ",
          link: "/#/hr/attendance",
          svgIcon:
            "M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z",
        },
      ],
    },
    {
      id: 3,
      label: "Holidays Management",
      svgIcon:
        "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
      subMenu: [
        {
          id: 31,
          label: "Holiday List",
          link: "/#/hr/holidays",
          svgIcon:
            "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z",
        },
      ],
    },
    {
      id: 4,
      label: "Mark Attendance",
      link: "/#/mark-attendance",
      svgIcon:
        "M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z",
    },
  ];

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

  const handleLogoClick = useLogoClickHandler();

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 sticky  top-0  z-20 md:flex flex-col w-60 bg-white h-screen shadow-lg border-r-2 border-[#FEF9F3] transition-transform delay-150 duration-200`}
    >
      <div className="flex items-center justify-center h-16 bg-white">
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
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
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
      <div className="mx-1">
        <picture className="mb-1 flex justify-center items-center ">
          <caption className="text-smfont-medium text-safekarolightOrange">
            Powered By
          </caption>
          <source srcSet={logo} type="image/png" />
          <img src={logo} className="w-32 mx-auto" alt="company Logo" />
        </picture>
      </div>
    </div>
  );
};

export default HRSidebar;
