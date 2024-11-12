import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetFuelTypeProps } from "../getFuelTypes";
const getFuelTypesAPI = async ({ header }: GetFuelTypeProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};
export default getFuelTypesAPI;
