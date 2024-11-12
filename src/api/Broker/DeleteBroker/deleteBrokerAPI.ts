import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteBrokerEndpoint as endpoint } from "../apiEndPoints";
import { DeleteBrokerProps } from "../getBrokersTypes";

const deleteBrokerAPI = async ({ header, brokerId }: DeleteBrokerProps) => {
  const url = endpoint(brokerId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteBrokerAPI;
