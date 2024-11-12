import GetPayInCommissionAPI from "./GetPayInCommissionAPI";
import { getPayInCommissionProps } from "../getDashbaordTypes";

const GetPayInCommissionService = async ({
  header,
  filter,
  broker,
}: getPayInCommissionProps): Promise<any> => {
  try {
    const res = await GetPayInCommissionAPI({
      header: header,
      filter: filter,
      broker: broker,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default GetPayInCommissionService;
