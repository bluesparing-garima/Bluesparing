import React, { createContext, useState, ReactNode } from "react";
import { Header, SafeKaroUser } from "./constant";

// Define SafeKaroContextType interface
interface SafeKaroContextType {
  user: SafeKaroUser | null;
  header: Header | null;

  login: (user: SafeKaroUser, header: Header) => void;
  logout: () => void;
  
}

// Default value for the context that matches the type
const SafeKaroContext = createContext<SafeKaroContextType>({
  user: null,
  header: null,

  login: () => {},
  logout: () => {},

});

// Initial state values
const initialUserState: SafeKaroUser = {
  isLoggedIn: false,
  id: "",
  name: "",
  email: "",
  role: "",
  partnerId: "",
  partnerCode: "",
  headRMId: "",
  headRM: "",
  idToken: "",
};

const initialHeader: Header = {
  "Content-Type": "application/json",
  "Access-Token": "",
  "Id-Token": "",
  "Refresh-Token": "",
};

// SafeKaroProvider component
const SafekaroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to manage user, logo, and header information
  const [user, setUser] = useState<SafeKaroUser>(initialUserState);

  const [header, setHeader] = useState<Header>(initialHeader);

  // Login function
  const login = (user: SafeKaroUser, header: Header) => {
    setUser({
      ...user,
      isLoggedIn: true,
    });
    setHeader(header);
  };



  // Logout function
  const logout = () => {
    setUser(initialUserState);
    setHeader(initialHeader);
   
  };

  return (
    <SafeKaroContext.Provider value={{ user, header, login, logout }}>
      {children}
    </SafeKaroContext.Provider>
  );
};

export { SafeKaroContext, SafekaroProvider };
