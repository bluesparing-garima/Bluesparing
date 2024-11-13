import React, { useState } from "react";
import logo from "../../assets/login_logo.png";
import useLogoClickHandler from "../../utils/useLogoClickHandler";
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
const BookingSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Dashboard",
      link: "/#/bookingdashboard",
      svgIcon: "M4 6h16M4 12h16M4 18h16",
    },
    {
      id: 2,
      label: "Policy",
      svgIcon:
        "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
      subMenu: [
        {
          id: 21,
          label: "Motor",
          link: "/#/policy/motorpolicies",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
        },
      ],
    },
    {
      id: 3,
      label: "Booking Request",
      svgIcon:
        "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
      subMenu: [
        {
          id: 31,
          label: "Request",
          link: "/#/booking",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
        },
        {
          id: 32,
          label: "New",
          link: "/#/booking/new",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
        },
        {
          id: 32,
          label: "Reject",
          link: "/#/booking/reject",
          svgIcon:
            "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9",
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
    {
      id: 5,
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
  const handleLogoClick = useLogoClickHandler();
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
      <div className="mx-1">
        <picture className="mb-1 flex flex-col justify-center items-center ">
          <caption className="text-sm font-medium text-safekarolightOrange">
            Powered By
          </caption>
          <source srcSet={logo} type="image/png" />
          <img src={logo} className="w-44 mx-auto" alt="company Logo" />
        </picture>
      </div>
    </div>
  );
};
export default BookingSidebar;
