import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editBrokerEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBrokerProps } from "../getBrokersTypes";

const editBrokerAPI = async ({ header, broker }: AddEditBrokerProps) => {
  const url = endpoint(broker.id!)
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...broker,
    }),
  }

  return fetchInterceptor(url, options)
  
};

export default editBrokerAPI;
