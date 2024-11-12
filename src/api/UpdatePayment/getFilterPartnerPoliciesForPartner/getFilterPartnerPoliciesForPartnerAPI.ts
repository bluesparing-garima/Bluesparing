import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterBrokerPoliciesForPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetFilterPartnerPoliciesForPartnerTypeProps } from "../getCalculatationTypes";

const getFilterPartnerPoliciesForPartnerAPI = async (
  props: GetFilterPartnerPoliciesForPartnerTypeProps
) => {
  const url = endpoint(props.startDate!, props.endDate!, props.partnerId!)

  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  };
  return fetchInterceptor(url, options);

};

export default getFilterPartnerPoliciesForPartnerAPI;

