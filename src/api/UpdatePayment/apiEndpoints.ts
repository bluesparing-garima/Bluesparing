
export const getFilterPartnerPoliciesForBrokerEndpoint = (
  startDate: string,
  endDate: string,
  brokerName: string
) =>
 (
    `/api/policy/motor/filter/broker-name?startDate=${startDate}&endDate=${endDate}&broker=${brokerName}`
  );
export const getFilterPaidPoliciesForPartnerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>

  `/api/policy/motor/payment/partner-id/paid-status?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}`


export const getFilterBrokerPoliciesForPartnerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>

  `/api/policy/motor/filter/partner-id?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}`

export const getFilterPaidPartialUnpaid = (
  startDate: string,
  endDate: string,
  partnerId: string
) =>
  `/api/policy/motor/payment/partner-id/status?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}`


export const getFilterPaidPartialUnpaidForBroker = (
  startDate: string,
  endDate: string,
  brokerId: string
) =>

  `/api/policy/motor/payment/broker-id/status?startDate=${startDate}&endDate=${endDate}&brokerId=${brokerId}`


export const updateFilterPaymentsEndpoint = () =>
  (`/api/policy/motor/payment/status-manage`);
export const addBalanceInPartner = () =>
  (`/api/statement/manage`);
export const getFilterPaidPoliciesForBrokerEndpoint = (
  startDate: string,
  endDate: string,
  partnerId: string
) => (`/api/policy/motor/payment/broker-id/paid-status?brokerId=${partnerId}&startDate=${startDate}&endDate=${endDate}`)
