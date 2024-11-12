import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { editFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const editFuelTypeAPI = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  const url = endpoint(fuelType.id!)
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...fuelType,
    }),
  }

  return fetchInterceptor(url, options)
 
};

export default editFuelTypeAPI;
