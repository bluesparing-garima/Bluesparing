import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addBrokerEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBrokerProps } from "../getBrokersTypes";

const addBrokerAPI = async ({ header, broker }: AddEditBrokerProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...broker,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addBrokerAPI;
