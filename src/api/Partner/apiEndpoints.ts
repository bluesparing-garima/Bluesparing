import { SafeKaroUser } from "../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const getPartnerEndpoint = (role: string) =>
 (`/api/user-profile/byRole/${UserData.parentAdminId}?role=${role}`);

export const historyPartnerEndpoint = (partnerId: string) =>
 (`/api/statement/manage/${partnerId}`);

export const debitHistoryPartnerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>
 (
    `/api/debit/date-range/${partnerId}/${UserData.parentAdminId}?startDate=${startDate}&endDate=${endDate}`
  );
export const transactionHistoryPartnerEndpoint = (
  transactionCode: string,
  partnerId: string
) =>
 (
    `/api/debit/transaction/${UserData.parentAdminId}?partnerId=${partnerId}&transactionCode=${transactionCode}`
  );
