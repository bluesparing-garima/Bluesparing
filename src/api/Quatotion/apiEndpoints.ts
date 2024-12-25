import { SafeKaroUser } from "../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const addQuotationEndpoint = () =>
  (`/api/lead-quotation/${UserData.parentAdminId}`);

export const getQuotationByleadIdEndpoint = (leadId: string) =>
  (`/api/lead-quotation/leadId/${UserData.parentAdminId}?leadId=${leadId}`);
