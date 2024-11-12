import { Header } from "../../Auth/IAuth";
import { ICompanies, ICompanyForm } from "../../components/Admin/Company/ICompany";

export interface AddEditCompanyProps {
  header: Header;
  company: ICompanyForm;
}

export interface GetCompanyProps {
  header?: Header;
}

export interface GetCompanyDetailsProps {
  header?: Header;
  companyId?: string;
}

export interface DeleteCompanyProps {
  header?: Header;
  companyId?: string;
  companies: ICompanies[];
}
