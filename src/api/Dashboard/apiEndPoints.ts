
export const getDashboardEndpoint = (startDate: string, endDate: string) =>
 (
    `/api/dashboard?startDate=${startDate}&endDate=${endDate}`
  );
export const getTotalPartnerPaymentEndpoint = (category: string) =>
 (`/api/dashboard/partner-admin?category=${category}`);

export const getMonthlyPartnerPaymentEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) =>
 (
    `/api/dashboard/partner-admin/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
export const getMonthlyPartnerPaymentWithCompanyEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) =>
 (
    `/api/dashboard/partner-admin/company-name/date-filter?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}&category=${category}`
  );
export const getPartnerPaymentWithCompanyEndpoint = (
  partnerId: string,
  category: string
) =>
 (
    `/api/dashboard/partner-admin/company-name?partnerId=${partnerId}&category=${category}`
  );
export const getTotalBrokerPaymentEndpoint = (category: string) =>
 (`/api/dashboard/broker-admin?category=${category}`);

export const getTotalBrokerLeftDistributedPaymentEndpoint = (
  category: string
) =>
 (
    `/api/dashboard/broker-admin/broker-balance?category=${category}`
  );
export const getBrokerPaymentWithLeftDistributedCompanyEndpoint = (
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/broker-balance/company-name?brokerId=${brokerId}&category=${category}`
  );

export const getBrokerBalancePaymentEndpoint = (category: string) =>
 (
    `/api/dashboard/broker-admin/payin-unpaid-partial?category=${category}`
  );
export const getBrokerPaymentWithBalanceCompanyEndpoint = (
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin-unpaid-partial/company-name?brokerId=${brokerId}&category=${category}`
  );

export const getMonthlyBrokerBalancePaymentEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin-unpaid-partial/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );

export const getRecievedBrokerPaymentEndpoint = (category: string) =>
 (
    `/api/dashboard/broker-admin/payin?category=${category}`
  );
export const getBrokerPaymentWithRecievedCompanyEndpoint = (
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin/company-name?brokerId=${brokerId}&category=${category}`
  );
export const getMonthlyBrokerRecievedPaymentEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );

export const getMonthlyBrokerLeftDistributedPaymentEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/broker-balance/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
export const getMonthlyBrokerPaymentEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/broker-date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
export const getMonthlyBrokerPaymentWithBalanceCompanyEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin-unpaid-partial/company-name/date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );

export const getMonthlyBrokerPaymentWithRecievedCompanyEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/payin/company-name/date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );

export const getMonthlyBrokerPaymentWithLeftDistributedCompanyEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/broker-balance/company-name/date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );

export const getMonthlyBrokerPaymentWithCompanyEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/company-name/broker-date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );
export const getBrokerPaymentWithCompanyEndpoint = (
  brokerId: string,
  category: string
) =>
 (
    `/api/dashboard/broker-admin/company-name?brokerId=${brokerId}&category=${category}`
  );
export const getBarChartEndpoint = (timeframe: string) =>
  `/api/user-profile/counts?timeframe=${timeframe}`;

export const getPartnerDashboardEndpoint = (
  partnerId: string,
  startDate: string,
  endDate: string
) =>
 (
    `/api/partner-dashboard?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}`
  );

export const getBookingDashboardEndpoint = (
  bookingUserId: string,
  startDate: string,
  endDate: string
) =>
 (
    `/api/booking-dashboard/${bookingUserId}?startDate=${startDate}&endDate=${endDate}`
  );
export const getOperationDashboardEndpoint = (operationUserId: string) =>
 (`/api/operation-dashboard/${operationUserId}`);
export const getAccountDashboardEndpoint = (
  startDate: string,
  endDate: string
) =>
 (
    `/api/account-dashboard?startDate=${startDate}&endDate=${endDate}`
  );

export const getCommissionDataEndpoint = (filter: string) =>
 (
    `/api/admin-dashboard/commission?timeframe=${filter}`
  );
export const getPolicyDataEndpoint = (filter: string) =>
 (
    `/api/admin-dashboard/policy-count?timeframe=${filter}`
  );
export const getPartnerPolicyDataEndpoint = (
  partnerId: string,
  filter: string
) =>
 (
    `/api/partner-dashboard/policy-count-partner?partnerId=${partnerId}&timeframe=${filter}`
  );
export const getPayInCommissionDataEndpoint = (
  partnerId: string,
  filter: string
) =>
 (
    `/api/broker-dashboard/payin-commission?brokerName=${partnerId}&timeframe=${filter}`
  );
export const getPayOutCommissionDataEndpoint = (
  partnerId: string,
  filter: string
) =>
 (
    `/api/partner-dashboard/payout-commission-partner?partnerId=${partnerId}&timeframe=${filter}`
  );

export const getPolicyRevenueEndpoint = (filter: string) =>
 (
    `/api/admin-dashboard/revenue-percentage?timeframe=${filter}`
  );
export const getRmDashboardEndpoints = (
  startDate: string,
  endDate: string,
  rmId: string
) =>
 (
    `/api/relationship-manager-dashboard?startDate=${startDate}&endDate=${endDate}&rmId=${rmId}`
  );
export const GetMonthlyPaidPayoutEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/payout-amount/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyPaidCompanyEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/payout-amount/company-name/date-filter?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
//monthly paout balance partner
export const GetMonthlyPayoutBalanceEndPoints = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/payout-amount-unpaid/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyPayoutBalCompanyEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/payout-amount-unpaid/company-name/date-filter?partnerId=${partnerId}&startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};

export const GetMonthlyLeftDistributionEndPoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/partner-balance/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyLeftDistributionCompanyEndPoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) => {
  return(
    `/api/dashboard/partner-admin/partner-balance/company-name/date-filter?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}&category=${category}`
  );
};

export const GetTotalNetPremiumPartnerEndpoint = (category: string) => {
  return(
    `/api/dashboard/net-premium/partner?category=${category}`
  );
}

export const GetTotalNetPremiumPartnerCompanyEndpoint = (category: string, partnerId: string) => {
  return(
    `/api/dashboard/net-premium/partner/companies?category=${category}&partnerId=${partnerId}`
  );
}

export const GetTotalNetPremiumBrokerEndpoint = (category: string) => {
  return(
    `/api/dashboard/net-premium/broker?category=${category}`
  );
}

export const GetTotalNetPremiumBrokerCompanyEndpoint = (category: string, brokerId: string) => {
  return(
    `/api/dashboard/net-premium/broker/companies?category=${category}&brokerId=${brokerId}`
  );
}
export const GetTotalFinalNetPremiumPartnerEndpoint = (category: string) => {
  return(
    `/api/dashboard/final-premium/partner?category=${category}`
  );
}

export const GetTotalFinalNetPremiumPartnerCompanyEndpoint = (category: string, partnerId: string) => {
  return(
    `/api/dashboard/final-premium/partner/companies?category=${category}&partnerId=${partnerId}`
  );
}

export const GetTotalFinalNetPremiumBrokerEndpoint = (category: string) => {
  return(
    `/api/dashboard/final-premium/broker?category=${category}`
  );
}

export const GetTotalFinalNetPremiumBrokerCompanyEndpoint = (category: string, brokerId: string) => {
  return(
    `/api/dashboard/final-premium/broker/companies?category=${category}&brokerId=${brokerId}`
  );
}
export const GetMonthlyPartnerNetPremiumEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/net-premium/partner/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyBrokerNetPremiumEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/net-premium/broker/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyPartnerCompanyNetPremiumEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) => {
  return(
    `/api/dashboard/net-premium/partner/companies/date-filter?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}&category=${category}`
  );
};
export const GetMonthlyBrokerCompanyNetPremiumEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) => {
  return(
    `/api/dashboard/net-premium/broker/companies/date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );
};


export const GetMonthlyPartnerFinalPremiumEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/final-premium/partner/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyBrokerFinalPremiumEndpoint = (
  startDate: string,
  endDate: string,
  category: string
) => {
  return(
    `/api/dashboard/final-premium/broker/date-filter?startDate=${startDate}&endDate=${endDate}&category=${category}`
  );
};
export const GetMonthlyPartnerCompanyFinalPremiumEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string,
  category: string
) => {
  return(
    `/api/dashboard/final-premium/partner/companies/date-filter?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}&category=${category}`
  );
};
export const GetMonthlyBrokerCompanyFinalPremiumEndpoint = (
  startDate: string,
  endDate: string,
  brokerId: string,
  category: string
) => {
  return(
    `/api/dashboard/final-premium/broker/companies/date-filter?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}&category=${category}`
  );
};