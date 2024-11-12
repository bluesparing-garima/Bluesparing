import { Header } from "../../Auth/IAuth";

export interface DebitPartnerProps {
  header: Header;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}

export interface DebitTransactionProps {
  header: Header;
  transactionCode?: string;
  partnerId?: string;
}
export interface GetPartnerProps {
  header?: Header;
  role?: string;
}

export interface GetPartnerDetailsProps {
  header?: Header;
  partnerId?: string;
}

export interface GetPartnerCardDetailsProps {
  header?: Header;
  partnerId?: string;
}
