import { GetAccountDetailsByBrokerProps } from "../getAccountTypes";
import PayInTdsAPI from "./PayInTdsAPI";

const PayInTdsServices = async (
    props: GetAccountDetailsByBrokerProps
): Promise<any> => {
    try {
        const resData = await PayInTdsAPI(props)
        return resData
    } catch (error) {
        throw error;
    }

};

export default PayInTdsServices;
