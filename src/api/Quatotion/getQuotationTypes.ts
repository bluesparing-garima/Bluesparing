import { Header } from "../../Auth/IAuth";

export interface AddEditQuotationProps {
  header: Header;
  quotation: any;
}

export interface GetQuotationProps {
  header?: Header;
}

export interface GetQuotationByLeadIdProps {
  header?: Header;
  leadId:string;
}