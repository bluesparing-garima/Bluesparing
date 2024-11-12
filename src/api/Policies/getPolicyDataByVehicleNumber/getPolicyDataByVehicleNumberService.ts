
import { GetVechicleNumberProps as GetVehicleNumberProps } from "../getPoliciesTypes";
import getPolicyDataByVehicleNumberAPI from "./getPolicyDataByVehicleNumberAPI";

const getPolicyDataByVehicleNumberService = async ({
    header,
    vehicleNumber,
}: GetVehicleNumberProps): Promise<any> => {
    try {
        const res = await getPolicyDataByVehicleNumberAPI({
            header: header,
            vehicleNumber
        })
        return res;
    } catch (error) {
        throw error
    }

};

export default getPolicyDataByVehicleNumberService;