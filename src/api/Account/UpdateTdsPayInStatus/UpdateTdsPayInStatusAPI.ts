import { header } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { updatePayinTdsProcessedEp as endpoint } from "../apiEndpoints";
import {  IUpdateTdsPayIn } from "../getAccountTypes";

const UpdateTdsPayInStatusAPI = async (payload: IUpdateTdsPayIn[]) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify([ ...payload] ),
  }
  return fetchInterceptor(url, options)
};

export default UpdateTdsPayInStatusAPI;
