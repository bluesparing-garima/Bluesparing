import { Header } from "../../Auth/IAuth";
import { ILeadForm } from "../../components/Partner/IPartner";

export interface GetLeadsQueryString {
  delete?: boolean;
}
export interface AddEditLeadsProps {
  header: Header;
  lead: any;
  leadId?: string;
}
export interface AcceptLeadsProps {
  header: Header;
  lead: ILeadForm;
}
export interface GetLeadsProps {
  header: Header;
}

export interface GetLeadByIdProps {
  header: Header;
  leadId: string;
}
export interface GetLeadByPartnerIdProps {
  header: Header;
  partnerId: string;
}
export interface GetLeadByUserIdProps {
  header: Header;
  userId: string;
}
