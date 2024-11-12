import { GetVechicleNumberProps } from "../getPoliciesTypes";
import getVechicleNumberAPI from "./getVechicleNumberAPI";

const getVechicleNumberService = async ({
  header,
  vehicleNumber,
}: GetVechicleNumberProps): Promise<any> => {
  try {
    const res = await getVechicleNumberAPI({
      header: header,
      vehicleNumber
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getVechicleNumberService;
