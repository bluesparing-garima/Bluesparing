import { IUpdateTdsPayout } from "../getAccountTypes";
import UpdateTdsStatusAPI from "./UpdateTdsStatusAPI";

const UpdateTdsStatusService = async (payload: IUpdateTdsPayout[]): Promise<any> => {
    try {
        const resData = await UpdateTdsStatusAPI(
            payload
        )
        return resData
    } catch (error) {
        throw error;
    }

};

export default UpdateTdsStatusService;
