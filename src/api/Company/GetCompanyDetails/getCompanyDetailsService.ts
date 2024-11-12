import getCompanyDetailsAPI from "./getCompanyDetailsAPI";
import { GetCompanyDetailsProps } from "../getCompaniesTypes";
import convertICompanyToICompanyVM from "../convertICompanyToICompanyVM";
import { ICompanies, ICompaniesVM } from "../../../components/Admin/Company/ICompany";
import { IResponse } from "../../IResponse";

const getCompanyDetailsService = async ({
  header,
  companyId,
}: GetCompanyDetailsProps): Promise<ICompaniesVM> => {
  try {
    const res = await getCompanyDetailsAPI({
      header: header,
      companyId: companyId,
    })as IResponse< ICompanies>
    const companies = convertICompanyToICompanyVM(res.data);
    return companies;
  } catch (error) {
    throw error
  }

};

export default getCompanyDetailsService;
