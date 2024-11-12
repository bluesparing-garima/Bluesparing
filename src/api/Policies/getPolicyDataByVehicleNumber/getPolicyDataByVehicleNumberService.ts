
import { GetVechicleNumberProps } from "../getPoliciesTypes";
import getPolicyDataByVehicleNumberAPI from "./getPolicyDataByVehicleNumberAPI";

const getPolicyDataByVehicleNumberService = async ({
    header,
    vehicleNumber,
}: GetVechicleNumberProps): Promise<any> => {
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