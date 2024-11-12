import deleteCompanyAPI from "./deleteCompanyAPI";
import { DeleteCompanyProps } from "../getCompaniesTypes";

const deleteCompanyService = async ({
  header,
  companyId,
  companies,
}: DeleteCompanyProps): Promise<any> => {
  try {
    await deleteCompanyAPI({
      header,
      companyId,
      companies,
    })
    const deletedCompanyIndex = companies.findIndex((company) => company._id === companyId);
    companies.splice(deletedCompanyIndex, 1);
    return companies;
  } catch (error) {
    throw error
  }

};

export default deleteCompanyService;
