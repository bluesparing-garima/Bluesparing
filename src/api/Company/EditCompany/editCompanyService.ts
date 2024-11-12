import editCompanyAPI from "./editCompanyAPI";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const editCompanyService = async ({ header, company }: AddEditCompanyProps):Promise<any> => {
  try {
    const res = await editCompanyAPI({
      header,
      company,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default editCompanyService;
