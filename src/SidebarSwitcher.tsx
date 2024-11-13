import React, { useState } from "react";
import Sidebar from "./components/Sidebar/sidebar";
import PartnerSidebar from "./components/Sidebar/partnerSideBar";
import BookingSidebar from "./components/Sidebar/bookingSidebar";
import OperationSidebar from "./components/Sidebar/operationSideBar";
import AccountSidebar from "./components/Sidebar/accountSideBar";
import Header from "./components/Header/header";
import RMSidebar from "./components/Sidebar/RMSidebar";
import HRSidebar from "./components/Sidebar/HRSidebar";
import ITSidebar from "./components/Sidebar/ITSidebar";
import { SafeKaroUser } from "./context/constant";

interface SidebarSwitcherProps {
  userData: SafeKaroUser | undefined;
  content: React.ReactNode;
}

const SidebarSwitcher: React.FC<SidebarSwitcherProps> = ({
  userData,
  content,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!userData) return null;

  const role = userData.role.toLowerCase();
  let SidebarComponent;

  switch (role) {
    case "admin":
      SidebarComponent = Sidebar;
      break;
    case "partner":
      SidebarComponent = PartnerSidebar;
      break;
    case "booking":
      SidebarComponent = BookingSidebar;
      break;
    case "operation":
      SidebarComponent = OperationSidebar;
      break;
    case "account":
      SidebarComponent = AccountSidebar;
      break;
    case "relationship manager":
    case "rm":
      SidebarComponent = RMSidebar;
      break;
    case "hr":
      SidebarComponent = HRSidebar;
      break;
    case "it":
      SidebarComponent = ITSidebar;
      break;
    default:
      SidebarComponent = null;
  }


  return (
    <div className="flex  bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20 absolute md:sticky left-0 md:top-0 transition-all duration-200`}
      >
        {SidebarComponent && (
          <SidebarComponent
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        {content}
      </div>
    </div>
  );
};

export default SidebarSwitcher;
