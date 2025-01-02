import { SafeKaroUser } from "../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const addAccountEndpoint = () =>
  (`/api/account`);
export const getAccountsEndpoint = () =>
  (`/api/account/${UserData.parentAdminId}`);
export const editAccountEndpoint = (accountId: string) =>
  (`/api/account/${accountId}`);
export const getAccountsByIdEndpoint = (accountId: string) =>
  (`/api/account/${accountId}/${UserData.parentAdminId}`);
export const getAccountsCreditDebitByIdEndpoint = (accountId: string) =>
  (`/api/account/account-details/${accountId}/${UserData.parentAdminId}`);

export const getAccountDetailsByBrokerEndpoint = (
  startDate: string,
  endDate: string,
  brokerName: string
) =>
(
  `/api/credit-debit/total-amount?startDate=${startDate}&endDate=${endDate}&brokerName=${brokerName}`
);
export const getAccountDetailsByPartnerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>
(
  `/api/credit-debit/partner/total-amount?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}`
);
