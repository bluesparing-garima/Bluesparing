// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { ICompanyForm, ICompaniesVM } from "../../components/Admin/Company/ICompany";

export const convertICompanyVMToICompanyForm = (company: ICompaniesVM): ICompanyForm => {
  const companyForm: ICompanyForm = {
    id: company.id!,
    companyName: company.companyName!,
    isActive: !!company.isActive,
    updatedBy: company.updatedBy!,
    createdBy: company.createdBy!,
  };
  return companyForm;
};
