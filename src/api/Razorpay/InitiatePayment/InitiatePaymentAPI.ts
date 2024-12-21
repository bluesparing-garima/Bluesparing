import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { initiatePaymentEp as endpoint } from "../ApiEndpoints";
import { IInitiatePayload } from "../IRazorpay";
import { header } from "../../../context/constant";

const InitiatePaymentAPI = async ({  amount }: IInitiatePayload) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            amount
        })
    }
    return fetchInterceptor(url, options)

};

export default InitiatePaymentAPI;