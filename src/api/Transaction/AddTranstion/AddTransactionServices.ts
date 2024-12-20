import { IAddTransaction } from "../ITransaction";
import AddTransactionAPI from "./AddTransactionAPI";


const AddTransactionServices = async ({

}: IAddTransaction): Promise<any> => {
    try {
        const res = AddTransactionAPI({

        });
        return res;
    } catch (error) {
        throw error;
    }
};

export default AddTransactionServices;