export interface GetFilterPoliciesForBrokerTypeProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  brokerName?: string;
}
export interface GetFilterPartnerPoliciesForPartnerTypeProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}
export interface updateFilterPaymentsTypeProps {
  header?: any;
  policyData?: any[];
}
export interface getFilterPaidPartialUnpaidProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}

export interface addAmountInPartnerProps {
  header?: any;
  partnerBalance?:number;
  payOutAmount?:number;
  startDate?: string;
  endDate?: string;
  partnerId?:string;
  accountId?:string;

}

export interface getFilterUnpaidPartialForBroker {
  header?: any;
  startDate?: string;
  endDate?: string;
  brokerId?: string;
  
}