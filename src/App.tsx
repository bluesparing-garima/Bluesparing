import { useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import { SafekaroProvider } from "./context/SafeKaroContext";
import {
  BRANCH_STORAGE_KEY,
  BROKER_STORAGE_KEY,
  CASE_TYPE_STORAGE_KEY,
  CATEGORY_STORAGE_KEY,
  COMPANY_STORAGE_KEY,
  FUEL_TYPE_STORAGE_KEY,
  MAKE_STORAGE_KEY,
  MODEL_STORAGE_KEY,
  MOTOR_POLICY_STORAGE_KEY,
  POLICY_TYPE_STORAGE_KEY,
  PRODUCT_STORAGE_KEY,
  PRODUCT_SUBTYPE_STORAGE_KEY,
  ROLE_STORAGE_KEY,
  SafeKaroUser,
  TEAM_STORAGE_KEY,
} from "./context/constant";
import { useEffect, useState } from "react";
import SidebarSwitcher from "./SidebarSwitcher";
function App() {
  const content = useRoutes(routes);
  const location = useLocation();
  const currentUrl = location.pathname;
  const [userData, setUserData] = useState<SafeKaroUser>();
  const handleSession = (currentUrl: string) => {
    const storageKeysMap = [
      { key: ROLE_STORAGE_KEY, condition: "/role" },
      { key: MOTOR_POLICY_STORAGE_KEY, condition: "/policy" },
      { key: TEAM_STORAGE_KEY, condition: "/team" },
      { key: BROKER_STORAGE_KEY, condition: "/broker" },
      { key: BRANCH_STORAGE_KEY, condition: "/branch" },
      { key: CATEGORY_STORAGE_KEY, condition: "/category" },
      { key: PRODUCT_SUBTYPE_STORAGE_KEY, condition: "/productsubtype" },
      { key: PRODUCT_STORAGE_KEY, condition: "/product" },
      { key: COMPANY_STORAGE_KEY, condition: "/company" },
      { key: CASE_TYPE_STORAGE_KEY, condition: "/casetype" },
      { key: POLICY_TYPE_STORAGE_KEY, condition: "/policyType" },
      { key: FUEL_TYPE_STORAGE_KEY, condition: "/fueltype" },
      { key: MAKE_STORAGE_KEY, condition: "/make" },
      { key: MODEL_STORAGE_KEY, condition: "/model" },
    ];
    if (!currentUrl.includes("/policy")) {
      sessionStorage.removeItem("startDate");
      sessionStorage.removeItem("endDate");
    }
    storageKeysMap.forEach(({ key, condition }) => {
      if (!currentUrl.includes(condition)) {
        sessionStorage.removeItem(key);
      }
    });
  };
  useEffect(() => {
    handleSession(currentUrl);
    if (currentUrl !== "/") {
      let storedTheme = localStorage.getItem("user");
      if (storedTheme) {
        let parsedUserData = JSON.parse(storedTheme) as SafeKaroUser;
        setUserData(parsedUserData);
      } else {
      }
    }
  }, [currentUrl]);
  return (
    <>
      <SafekaroProvider>
        {currentUrl === "/" ||
        currentUrl === "/signup" ||
        currentUrl === "/403" ? (
          <> {content}
          </>
        ) : (
          <SidebarSwitcher userData={userData} content={content} />
        )}
      </SafekaroProvider>
    </>
  );
}
export default App;
