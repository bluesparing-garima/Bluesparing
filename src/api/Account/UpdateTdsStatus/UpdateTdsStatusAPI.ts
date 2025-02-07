import { header } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { updateTdsProcessedEp as endpoint } from "../apiEndpoints";
import {  IUpdateTdsPayout } from "../getAccountTypes";

const UpdateTdsStatusAPI = async (payload: IUpdateTdsPayout[]) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify([ ...payload] ),
  }
  return fetchInterceptor(url, options)
};

export default UpdateTdsStatusAPI;
