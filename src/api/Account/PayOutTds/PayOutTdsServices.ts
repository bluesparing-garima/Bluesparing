import { GetAccountDetailsByPartnerProps } from "../getAccountTypes";
import PayOutTdsAPI from "./PayOutTdsAPI";

const PayOutTdsServices = async (
    props: GetAccountDetailsByPartnerProps
): Promise<any> => {
    try {
        const resData = await PayOutTdsAPI(props)
        return resData
    } catch (error) {
        throw error;
    }

};

export default PayOutTdsServices;
