import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { updateFilterPaymentsEndpoint as endpoint } from "../apiEndpoints";
import { updateFilterPaymentsTypeProps } from "../getCalculatationTypes";

const updateFilterPaymentsAPI = async ({
  header,
  policyData,
}: updateFilterPaymentsTypeProps) => {
  const url = endpoint()

  const options: FetchOptions = {
    method: "PUT",
    headers: header,
    body: JSON.stringify([...policyData!]),
  };

  return fetchInterceptor(url, options)

};

export default updateFilterPaymentsAPI;
