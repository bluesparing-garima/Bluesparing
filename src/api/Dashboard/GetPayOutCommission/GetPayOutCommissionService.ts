import GetPayOutCommissionAPI from "./GetPayOutCommissionAPI";
import { getPayOutCommissionProps } from "../getDashbaordTypes";

const GetPayOutCommissionService = async ({
  header,
  filter,
  partnerId,
}: getPayOutCommissionProps):Promise<any> => {
  try {
    const res  = await GetPayOutCommissionAPI({
      header: header,
      filter: filter,
      partnerId: partnerId,
    })

    return  res ;
  } catch (error) {
    throw error
  }

};

export default GetPayOutCommissionService;
