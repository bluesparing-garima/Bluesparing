import { Header } from "../../Auth/IAuth";

export interface AddEditAccountProps {
  header: Header;
  account: any;
  accountId?: string;
}
export interface GetAccountProps {
  header: Header;
  partnerId?: string;

}
export interface GetAccountByIdProps {
  header: Header;
  accountId: string;
}
export interface GetAccountByRoleProps {
  header: Header;
  partnerId?: string;
  role: string;
}
export interface GetAccountDetailsByBrokerProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  brokerId?: string;
}
export interface GetAccountDetailsByPartnerProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}
export interface IUpdateTdsPayout {
  _id: string;
  tdsProcessed: boolean;
  tdsAmount: number;
  partnerId: string;
  remarks?: string;
  accountType?: string;
  accountId: string;
  tdsPercentage: number;
  startDate: string;
  endDate: string;
  distributedDate: string;
  accountCode: string;
  partnerName: string;
}

export interface IUpdateTdsPayIn {
  _id: string;
  tdsProcessed: boolean;
  tdsAmount: number;
  brokerId: string;
  remarks?: string;
  accountType?: string;
  accountId: string;
  tdsPercentage: number;
  startDate: string;
  endDate: string;
  distributedDate: string;
  accountCode: string;
  brokerName: string;
}