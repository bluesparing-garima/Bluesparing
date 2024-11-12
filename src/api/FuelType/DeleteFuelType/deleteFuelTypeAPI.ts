import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { deleteFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteFuelTypeProps } from "../getFuelTypes";

const deleteFuelTypeAPI = async ({ header, fuelTypeId }: DeleteFuelTypeProps) => {
  const url = endpoint(fuelTypeId!)
  const options: FetchOptions = {
    method: "DELETE",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default deleteFuelTypeAPI;
