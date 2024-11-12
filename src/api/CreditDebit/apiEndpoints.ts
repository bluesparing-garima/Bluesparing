
export const getAccountManageEndpoint = () =>
 (`/api/account-manage`);
export const getAccountManageByAccountIdEndpoint = (accountId: string) =>
 (`/api/account-manage/account-id/${accountId}`);
export const getAccountManageByIdEndpoint = (accountId: string) =>
 (`/api/account-manage/${accountId}`);
export const addCreditDebitEndpoint = () =>
 (`/api/credit-debit`);
export const addAccountManage = () =>
 (`/api/account-manage`);
export const getCreditDebitsEndpoint = () =>
 (`/api/credit-debit`);
export const editCreditDebitEndpoint = (creditDebitId: string) =>
 (`/api/credit-debit/${creditDebitId}`);
export const getCreditDebitsByIdEndpoint = (creditDebitId: string) =>
 (`/api/credit-debit/${creditDebitId}`);
export const getCreditDebitsByBrokerEndpoint = (
  brokerId: string,
  startDate: string,
  endDate: string
) =>
 (
    `/api/account-manage/broker-id?brokerId=${brokerId}&startDate=${startDate}&endDate=${endDate}`
  );
  export const getAccountManageByPartnerDateRangeEndpoint = (
    partnerId: string,
    startDate: string,
    endDate: string
  ) =>
   (
      `/api/account-manage/partner-id?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}`
    );
  
export const getCreditDebitsByPartnerEndpoint = (partnerId: string) =>
 (
    `/api/credit-debit/partner-id?partnerId=${partnerId}`
  );
export const getCreditDebitsByPartnerDateRangeEndpoint = (
  partnerId: string,
  startDate: string,
  endDate: string
) =>
 (
    `/api/credit-debit/partner-id?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}`
  );

export const getDebitDetailsEndpoint = (
  partnerId: string,
  startDate: string,
  endDate: string
) =>
 (
    `/api/statement/date-range?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}`
  );
