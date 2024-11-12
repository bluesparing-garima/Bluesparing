
export const TotalPayoutLeftDistEndpoint = (category: string) =>
(
    `/api/dashboard/partner-admin/partner-balance?category=${category}`
  );
export const totalPayoutLeftDistCompanyEndpoint = (
  partnerId: string,
  category: string
) =>
(
    `/api/dashboard/partner-admin/partner-balance/company-name?partnerId=${partnerId}&category=${category}`
  );
export const TotalPaidPayoutEndpoint = (category: string) =>
(
    `/api/dashboard/partner-admin/payout-amount?category=${category}`
  );
export const TotalPaidPayoutCompanyEndpoint = (
  partnerId: string,
  category: string
) =>
(
    `/api/dashboard/partner-admin/payout-amount/company-name?partnerId=${partnerId}&category=${category}`
  );
export const TotalPayoutBalanceEndpoint = (category: string) =>
(
    `/api/dashboard/partner-admin/payout-amount-unpaid?category=${category}`
  );
export const TotalPayoutBalanceCompanyEndpoint = (
  partnerId: string,
  category: string
) =>
(
    `/api/dashboard/partner-admin/payout-amount-unpaid/company-name?partnerId=${partnerId}&category=${category}`
  );
