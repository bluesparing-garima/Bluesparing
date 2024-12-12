import React, { useState } from "react";
import Header from "./components/Header/header";
import DynamicSidebar from "./components/DynamicSidebar/DynamicSidebar";
import { SafeKaroUser } from "./context/constant";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";

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

  let SidebarComponent = DynamicSidebar;

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
        <ProtectedRoute >
        {content}
        </ProtectedRoute>
       
        <Footer />
      </div>
    </div>
  );
};

export default SidebarSwitcher;
