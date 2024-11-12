import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterPaidPartialUnpaidForBroker as endpoint } from "../apiEndpoints";
import {  getFilterUnpaidPartialForBroker } from "../getCalculatationTypes";

const getFilterPoliciesForBrokerAPI = async (
  props: getFilterUnpaidPartialForBroker
) => {
  const url = endpoint(props.startDate!, props.endDate!, props.brokerId!);
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  };
  return fetchInterceptor(url, options);
};

export default getFilterPoliciesForBrokerAPI;


