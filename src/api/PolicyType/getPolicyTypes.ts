import { Header } from "../../Auth/IAuth";
import { IPolicyTypeForm, IPolicyTypes } from "../../components/Admin/PolicyType/IPolicyType";

export interface AddEditPolicyTypeProps {
  header: Header;
  policyType: IPolicyTypeForm;
}

export interface GetPolicyTypeProps {
  header?: Header;
}

export interface GetPolicyTypeDetailsProps {
  header?: Header;
  policyTypeId?: string;
}

export interface DeletePolicyTypeProps {
  header?: Header;
  policyTypeId?: string;
  policyTypes: IPolicyTypes[];
}
