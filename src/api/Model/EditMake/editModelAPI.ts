import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editModelEndpoint as endpoint } from "../apiEndpoints";
import { AddEditModelProps } from "../getModelsTypes";

const editModelAPI = async ({ header, model }: AddEditModelProps) => {
  const url = endpoint(model.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...model,
    }),
  }
  return fetchInterceptor(url, options)

};

export default editModelAPI;
