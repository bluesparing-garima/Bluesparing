import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterPaidPoliciesForPartnerEndpoint as endpoint } from "../apiEndpoints";
import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";

const getFilterPaidAPI = async (props: getFilterPaidPartialUnpaidProps) => {
  const url = endpoint(props.startDate!, props.endDate!, props.partnerId!)
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  };


  return fetchInterceptor(url, options)

};

export default getFilterPaidAPI;
