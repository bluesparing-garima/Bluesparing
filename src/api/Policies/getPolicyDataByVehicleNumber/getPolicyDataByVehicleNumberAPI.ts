import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPolicyDataByVehicleNumber as endpoint } from "../apiEndpoints";
import {  GetVechicleNumberProps as GetVehicleNumberProps } from "../getPoliciesTypes";

const getPolicyDataByVehicleNumberAPI = async ({
  header,
  vehicleNumber,
}: GetVehicleNumberProps) => {
  const url = endpoint(vehicleNumber)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)

 
};

export default getPolicyDataByVehicleNumberAPI;
