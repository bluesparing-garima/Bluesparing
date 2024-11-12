import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { validateModelEndpoint as endpoint } from "../apiEndpoints";
import { ValidateModelDetailsProps } from "../getModelsTypes";

const validateModelAPI = async ({
  header,
  modelName,
}: ValidateModelDetailsProps) => {
  const url = endpoint(modelName!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default validateModelAPI;
