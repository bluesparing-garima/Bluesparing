import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { ICompanies, ICompaniesVM } from "../../components/Admin/Company/ICompany";

const convertICopmanyToICompanyVM = (data: ICompanies): ICompaniesVM => {
  const companyViewModel: ICompaniesVM = {
    id: data._id ? data._id : "",
    companyName: data.companyName ? data.companyName : "",
    createdBy: data.createdBy ? data.createdBy : "",
    isActive: data.isActive ? data.isActive : true,
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return companyViewModel;
};

export default convertICopmanyToICompanyVM;
