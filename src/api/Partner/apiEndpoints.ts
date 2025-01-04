export const getPartnerEndpoint = (role: string) =>
 (`/api/user-profile/byRole?role=${role}`);

export const historyPartnerEndpoint = (partnerId: string) =>
 (`/api/statement/manage/${partnerId}`);

export const debitHistoryPartnerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>
 (
    `/api/debit/date-range/${partnerId}?startDate=${startDate}&endDate=${endDate}`
  );
export const transactionHistoryPartnerEndpoint = (
  transactionCode: string,
  partnerId: string
) =>
 (
    `/api/debit/transaction?partnerId=${partnerId}&transactionCode=${transactionCode}`
  );
