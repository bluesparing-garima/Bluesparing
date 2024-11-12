import getCompaniesAPI from "./getCompaniesAPI";
import { GetCompanyProps } from "../getCompaniesTypes";

const getCompaniesService = async ({ header }: GetCompanyProps): Promise<any> => {
  try {
    const res = await getCompaniesAPI({
      header: header,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getCompaniesService;
