import { useContext } from "react";
import { SafeKaroContext } from "./SafeKaroContext";

const useSafekaroContextAuth = () => {
  const context = useContext(SafeKaroContext);

  if (!context) {
    throw new Error("AuthContext is unavailable");
  }

  return context;
};
export default useSafekaroContextAuth;
