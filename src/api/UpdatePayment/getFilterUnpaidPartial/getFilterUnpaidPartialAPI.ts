import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterPaidPartialUnpaid as endpoint } from "../apiEndpoints";
import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";


const getFilterUnpaidPartialAPI = async (
  props: getFilterPaidPartialUnpaidProps
) => {
  const url = endpoint(props.startDate!, props.endDate!, props.partnerId!);
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  };

  return fetchInterceptor(url, options);
};

export default getFilterUnpaidPartialAPI;
