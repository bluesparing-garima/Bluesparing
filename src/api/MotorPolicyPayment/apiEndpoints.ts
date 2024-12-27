import { SafeKaroUser } from "../../context/constant";

let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const editPolicyPaymentEndpoint = (policyId: string) =>
  (`/api/policy/motor/payment/${policyId}/${UserData.parentAdminId}`);

export const getPolicyByWithPaymentEndpoint = (policyId: string) =>
  (`/api/policy/motor/${policyId}`);
