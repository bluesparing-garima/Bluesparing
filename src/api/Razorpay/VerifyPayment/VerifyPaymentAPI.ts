import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { verifyPaymentEp as endpoint } from "../ApiEndpoints";
import { IVerifyResponsePayload } from "../IRazorpay";
import { header } from "../../../context/constant";
const VerifyPaymentAPI = async ({ razorpay_signature, razorpay_payment_id, razorpay_order_id }: IVerifyResponsePayload) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      razorpay_signature, razorpay_payment_id, razorpay_order_id
    })
  }
  return fetchInterceptor(url, options)

};

export default VerifyPaymentAPI;