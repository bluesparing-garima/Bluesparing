import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { uploadpolicyPdf as endpoint } from "../apiEndpoints";
const UploadPolicyPdfAPI = async (payload: any) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "PUT",
    body: payload,
  }
  return fetchInterceptor(url, options)

};

export default UploadPolicyPdfAPI;