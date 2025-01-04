import React, { createContext, useState, ReactNode } from "react";
import { Header, SafeKaroUser } from "./constant";
interface SafeKaroContextType {
  user: SafeKaroUser | null;
  header: Header | null;
  login: (user: SafeKaroUser, header: Header) => void;
  logout: () => void;
}
const SafeKaroContext = createContext<SafeKaroContextType>({
  user: null,
  header: null,
  login: () => {},
  logout: () => {},
});
const initialUserState: SafeKaroUser = {
  isLoggedIn: false,
  name: "",
  email: "",
  role: "",
  profileId: "",
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
const SafekaroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SafeKaroUser>(initialUserState);
  const [header, setHeader] = useState<Header>(initialHeader);
  const login = (user: SafeKaroUser, header: Header) => {
    setUser({
      ...user,
      isLoggedIn: true,
    });
    setHeader(header);
  };
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
