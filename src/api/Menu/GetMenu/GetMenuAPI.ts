import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMenuEndpoint as endpoint } from "../apiEndpoints";
import { IGetMenu } from "../IMenuType";

const GetMenuAPI = async ({header,roleId}:IGetMenu ) => {
  const url = endpoint(roleId)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default GetMenuAPI;