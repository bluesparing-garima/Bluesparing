import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { updatePayInPayOutDateRangeEndpoint as endpoint } from "../apiEndpoints";
import { UpdatePayInPayOutDateRangeProps } from "../getCalculatationTypes";

const updatePayInOutDateRangeAPI = async ({
  header,
  data,
}: UpdatePayInPayOutDateRangeProps) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...data,
    }),
  }

  return fetchInterceptor(url, options)
 
};

export default updatePayInOutDateRangeAPI;
