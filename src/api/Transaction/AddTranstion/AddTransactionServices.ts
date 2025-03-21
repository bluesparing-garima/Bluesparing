import { IAddTransaction } from "../ITransaction";
import AddTransactionAPI from "./AddTransactionAPI";


const AddTransactionServices = async ({
    data
}: IAddTransaction): Promise<any> => {
    try {
        const res =await AddTransactionAPI({
        data
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export default AddTransactionServices;