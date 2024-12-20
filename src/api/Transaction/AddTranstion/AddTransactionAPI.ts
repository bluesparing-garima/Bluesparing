import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addTransaction as endpoint } from "../apiEndPoints";
import { header } from "../../../context/constant";
import { IAddTransaction } from "../ITransaction";

const AddTransactionAPI = async ({ }: IAddTransaction) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify({

        })
    }
    return fetchInterceptor(url, options)

};

export default AddTransactionAPI;