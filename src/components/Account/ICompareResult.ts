export interface IPolicyBrokerData {
  policyNumber: string;
  db_payInCommission: number;
  excel_payInCommission?: number;
  difference?: number;
  hasDifference?: boolean;
}

export interface CompareBrokerResultProps {
  broker: string;
  status: string;
  message: string;
  data: IPolicyBrokerData[];
}

export interface IPolicyPartnerData {
  policyNumber: string;
  partnerName: string;
  db_payOutCommission: number;
  difference?: number;
  excel_payOutCommission?: number,
  hasDifference?: boolean;
}
export interface ComparePartnerResultProps {
  partner: string;
  status: string;
  message: string;
  data: IPolicyPartnerData[];
}
