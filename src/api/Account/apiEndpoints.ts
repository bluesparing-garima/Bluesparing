
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


export const getAccountsByRoleEndpoint = (role: string, partnerId?: string) => {
  if (partnerId) {
    return `/api/account/get-accounts-by-role/role?roleName=${role}&partnerId=${partnerId}`
  } else {
    return `/api/account/get-accounts-by-role/role?roleName=${role}`
  }
}

export const getTdsPayoutEp = (
  startDate: string,
  endDate: string,
) =>
(
  `/api/policy/motor/payment/partner-id/tds?startDate=${startDate}&endDate=${endDate}`
);


export const getTdsPayinEp = (
  startDate: string,
  endDate: string,
) =>
(
  `/api/policy/motor/payment/broker-id/tds?startDate=${startDate}&endDate=${endDate}`
);
export const updateTdsProcessedEp = () => {
  return ('/api/policy/motor/payment/tds-status-manage')
}
export const updatePayinTdsProcessedEp = () => {
  return ('/api/policy/motor/payment/broker-tds-status-manage')
}
export const transferMoneyEp = () => {
  return ('/api/account-manage/transfer-money')
}

