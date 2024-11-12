import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterPoliciesByDateEndpoint as endpoint } from "../apiEndpoints";
import { GetFilterPoliciesByDateTypeProps } from "../getCalculatationTypes";

const getFilterPoliciesByDateAPI = async (
  props: GetFilterPoliciesByDateTypeProps
) => {
  const url = endpoint(props.startDate!, props.endDate!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }

  return fetchInterceptor(url, options)

};

export default getFilterPoliciesByDateAPI;
