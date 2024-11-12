import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getPayOutCommissionDataEndpoint as endpoint } from "../apiEndPoints";
import { getPayOutCommissionProps } from "../getDashbaordTypes";

const GetPayOutCommissionAPI = async ({
  header,
  partnerId,
  filter,
}: getPayOutCommissionProps) => {
  const url = endpoint(partnerId, filter)
  const options: FetchOptions = {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)

};

export default GetPayOutCommissionAPI;
