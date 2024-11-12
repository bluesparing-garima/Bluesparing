import { Header } from "../../Auth/IAuth";
import { ICreditDebitForm } from "../../components/Account/CreditDebit/ICreditDebits";

export interface AddEditCreditDebitProps {
  header: Header;
  creditDebit: ICreditDebitForm;
  creditDebitId?: string;
}
export interface GetCreditDebitProps {
  header: Header;
}
export interface GetManageAccountProps {
  header: Header;
}
export interface GetAccountManageByIdProps {
  header: Header;
  accountId: string;
}
export interface GetCreditDebitByIdProps {
  header: Header;
  creditDebitId: string;
}
export interface GetCreditDebitByBrokerProps {
  header: Header;
  brokerId: string;
  startDate: string;
  endDate: string;
}
export interface GetCreditDebitByPartnerProps {
  header: Header;
  partnerId: string;
}
export interface GetCreditDebitByPartnerDateRangeProps {
  header: Header;
  partnerId: string;
  startDate: string;
  endDate: string;
}
export interface GetDebitDetailsProps {
  header: Header;
  partnerId: string;
  startDate: string;
  endDate: string;
}
