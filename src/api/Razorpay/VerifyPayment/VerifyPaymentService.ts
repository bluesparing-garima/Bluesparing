
import { IVerifyResponsePayload } from "../IRazorpay";
import VerifyPaymentAPI from "./VerifyPaymentAPI";

const VerifyPaymentService = async ({
  razorpay_signature, razorpay_payment_id, razorpay_order_id
}: IVerifyResponsePayload): Promise<any> => {
  try {
    const res = VerifyPaymentAPI({
      razorpay_signature, razorpay_payment_id, razorpay_order_id
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default VerifyPaymentService;