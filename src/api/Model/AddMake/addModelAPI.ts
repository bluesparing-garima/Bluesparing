import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addModelEndpoint as endpoint } from "../apiEndpoints";
import { AddEditModelProps } from "../getModelsTypes";

const addModelAPI = async ({ header, model }: AddEditModelProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...model,
    }),
  }
  return fetchInterceptor(url, options)

};

export default addModelAPI;
