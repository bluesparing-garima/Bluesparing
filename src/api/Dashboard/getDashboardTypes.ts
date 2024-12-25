import { Header } from "../../Auth/IAuth";

export interface getAdminDashboardProps {
  header: Header;
  startDate: string;
  endDate: string;
  parentAdminId?:string;
}

export interface getPartnerDashboardProps {
  header: Header;
  partnerId: string;
  startDate: string;
  endDate: string;
}

export interface getBookingDashboardProps {
  header: Header;
  bookingUserId: string;
  startDate: string;
  endDate: string;
}
export interface getOperationDashboardProps {
  header: Header;
  operationUserId: string;
}

export interface GetBarChartDashboardProps {
  header: Header;
  timeframe: string;
}
export interface getAccountDashboardProps {
  header: Header;
  startDate: string;
  endDate: string;
  rmId?: string;
}
export interface getCommissionProps {
  header: Header;
  filter: string;
}
export interface getPolicyProps {
  header: Header;
  filter: string;
}
export interface getPayInCommissionProps {
  header: Header;
  filter: string;
  broker: string;
}
export interface getPayOutCommissionProps {
  header: Header;
  filter: string;
  partnerId: string;
}
export interface getPartnerCommissionProps {
  header: Header;
  filter: string;
  partnerId: string;
}
export interface getTotalPartnerPaymentProps {
  header: Header;
  category: string;
}
export interface getTotalBrokerPaymentProps {
  header: Header;
  category: string;
}
export interface getPartnerCompanyPaymentProps {
  header: Header;
  partnerId: string;
  category: string;
}
export interface getBrokerCompanyPaymentProps {
  header: Header;
  brokerId: string;
  category: string;
}
export interface getMonthlyPartnerFinalPreminumProps {
  header: Header;
  startDate: string;
  endDate: string;
  category: string;
}
export interface getMonthlyPartnerPaymentProps {
  header: Header;
  startDate: string;
  endDate: string;
  category: string;
}
export interface getMonthlyBrokerFinalPaymentProps {
  header: Header;
  startDate: string;
  endDate: string;
  category: string;
}
export interface getMonthlyBrokerPaymentProps {
  header: Header;
  startDate: string;
  endDate: string;
  category: string;
}
export interface getMonthlyPartnerPaymentWithCompanyProps {
  header: Header;
  startDate: string;
  endDate: string;
  partnerId: string;
  category: string;
}

export interface getMonthlyBrokerPaymentWithCompanyProps {
  header: Header;
  startDate: string;
  endDate: string;
  brokerId: string;
  category: string;
}
