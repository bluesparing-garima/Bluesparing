
export const addAccountEndpoint = () =>
  (`/api/account`);
export const getAccountsEndpoint = () =>
  (`/api/account`);
export const editAccountEndpoint = (accountId: string) =>
  (`/api/account/${accountId}`);
export const getAccountsByIdEndpoint = (accountId: string) =>
  (`/api/account/${accountId}`);
export const getAccountsCreditDebitByIdEndpoint = (accountId: string) =>
  (`/api/account/account-details/${accountId}`);

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
