import { GetVechicleNumberProps } from "../getPoliciesTypes";
import getVehicleNumberAPI from "./getVechicleNumberAPI";

const getVehicleNumberService = async ({
  header,
  vehicleNumber,
}: GetVechicleNumberProps): Promise<any> => {
  try {
    const res = await getVehicleNumberAPI({
      header: header,
      vehicleNumber
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getVehicleNumberService;
