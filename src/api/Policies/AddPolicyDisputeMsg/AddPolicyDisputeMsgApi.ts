import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addDisputeMsgEp as endpoint } from "../apiEndpoints";

const AddPolicyDisputeMsgApi = async (chat : FormData) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: chat,
  }
  return fetchInterceptor(url, options)

};

export default AddPolicyDisputeMsgApi;
