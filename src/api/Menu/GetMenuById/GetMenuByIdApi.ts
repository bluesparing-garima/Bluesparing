import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getMenuByIdEndpoint as endpoint } from "../apiEndpoints";
import { IGetMenuById } from "../IMenuType";

const GetMenuByIdApi = async ({ header,id }:IGetMenuById) => {
  const url = endpoint(id)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }
  return fetchInterceptor(url, options)
};

export default GetMenuByIdApi;