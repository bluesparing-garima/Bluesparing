import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getVechicleNumberEndpoint as endpoint } from "../apiEndpoints";
import { GetVechicleNumberProps } from "../getPoliciesTypes";

const getVechicleNumberAPI = async ({
  header,
  vehicleNumber,
}: GetVechicleNumberProps) => {
  const url = endpoint(vehicleNumber)

  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getVechicleNumberAPI;
