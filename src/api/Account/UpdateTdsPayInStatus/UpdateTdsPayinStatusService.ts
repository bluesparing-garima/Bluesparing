import { IUpdateTdsPayIn } from "../getAccountTypes";
import UpdateTdsPayInStatusAPI from "./UpdateTdsPayInStatusAPI";

const UpdateTdsPayinStatusService = async (payload: IUpdateTdsPayIn[]): Promise<any> => {
    try {
        const resData = await UpdateTdsPayInStatusAPI(
            payload
        )
        return resData
    } catch (error) {
        throw error;
    }

};

export default UpdateTdsPayinStatusService;
