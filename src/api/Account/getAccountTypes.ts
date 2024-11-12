import { Header } from "../../Auth/IAuth";

export interface AddEditAccountProps {
  header: Header;
  account: any;
  accountId?: string;
}
export interface GetAccountProps {
  header: Header;
}
export interface GetAccountByIdProps {
  header: Header;
  accountId: string;
}
export interface GetAccountDetailsByBrokerProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  brokerName?: string;
}
export interface GetAccountDetailsByPartnerProps {
  header?: any;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}
