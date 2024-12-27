import { SafeKaroUser } from "../../context/constant";

  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

export const addLeadEndpoint = () =>
 (`/api/lead-generate`);

export const editLeadEndpoint = (leadId: string) =>
 (`/api/lead-generate/${leadId}`);

export const getLeadByIdEndpoint = (leadId: string) =>
 (`/api/lead-generate/${leadId}`);

export const getLeadEndpoint = () =>
 (`/api/lead-generate/${UserData.parentAdminId}`);

export const getLeadByPartnerIdEndpoint = (partnerId: string) =>
 (`/api/lead-generate/partner-id/${partnerId}/${UserData.parentAdminId}`);

export const getLeadByUserIdEndpoint = (userId: string) =>
 (`/api/lead-generate/created-by/${userId}/${UserData.parentAdminId}`);

export const acceptLeadEndpoint = (leadId: string) =>
 (`/api/lead-generate/accepted-lead/${leadId}`);
