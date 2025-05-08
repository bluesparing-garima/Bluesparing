import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { AddHealthEp as endpoint } from "../Endpoints";
import { IAddHealth } from "../IHealth";


const AddHealthApi = async ({healthData}:IAddHealth) => {

  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: healthData,
  }
  return fetchInterceptor(url, options)

};

export default AddHealthApi;