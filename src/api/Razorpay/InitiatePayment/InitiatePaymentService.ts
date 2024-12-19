import { IInitiatePayload } from "../IRazorpay";
import InitiatePaymentAPI from "./InitiatePaymentAPI";

const InitiatePaymentService = async ({
    amount,
}: IInitiatePayload): Promise<any> => {
    try {
        const res = InitiatePaymentAPI({
            amount
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export default InitiatePaymentService;