import { IAccountTransfer } from "../../../components/Account/IAccounts";
import TransferMoneyAPI from "./TransferMoneyAPI";

const TransferMoneyService = async (payload: IAccountTransfer): Promise<any> => {
    try {
        const resData = await TransferMoneyAPI(payload)
        return resData
    } catch (error) {
        throw error;
    }

};

export default TransferMoneyService;
