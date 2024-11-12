import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFuelTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetFuelTypeDetailsProps } from "../getFuelTypes";

const getFuelTypeDetailsAPI = async ({ header, fuelTypeId }: GetFuelTypeDetailsProps) => {
  const url = endpoint(fuelTypeId!)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

};

export default getFuelTypeDetailsAPI;
