import addCompanyAPI from "./addCompanyAPI";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const addCompanyService = async ({ header, company }: AddEditCompanyProps):Promise<any> => {
  try {
    const res = await addCompanyAPI({
      header: header,
      company: company,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default addCompanyService;
