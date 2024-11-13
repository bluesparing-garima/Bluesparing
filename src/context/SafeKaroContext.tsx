import React, { createContext, useState, ReactNode } from "react";
import { Header, SafeKaroUser } from "./constant";
interface SafeKaroContextType {
  user: SafeKaroUser | null;
  header: Header | null;
  login: (user: SafeKaroUser, header: Header) => void;
  logout: () => void;
}
const SafeKaroContext = createContext<SafeKaroContextType | undefined>({
  user: null,
  header: null,
  login: () => {},
  logout: () => {},
});
const initialUserState: SafeKaroUser = {
  isLoggedIn: false,
  id: "",
  name: "",
  email: "",
  role: "",
  partnerId: "",
  partnerCode:"",
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
  const login = (user: any, header: Header) => {
    const loggedInUser: SafeKaroUser = {
      isLoggedIn: true,
      id: user.id,
      name: user.name,
      role: user.role,
      partnerId: user.partnerId,
      partnerCode: user.partnerCode,
      headRMId: user.headRMId,
      headRM: user.headRM,
      idToken: user.token,
      email: user.email,
    };
    setUser(loggedInUser);
    setHeader({
      "Content-Type": "application/json",
      "Access-Token": header["Access-Token"],
      "Id-Token": header["Id-Token"],
      "Refresh-Token": header["Refresh-Token"],
    });
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
