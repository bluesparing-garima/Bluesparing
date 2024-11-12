import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const addFuelTypeAPI = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...fuelType,
    }),
  }

  return fetchInterceptor(url, options)

};

export default addFuelTypeAPI;

