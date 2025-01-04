
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addQuotationEndpoint as endpoint } from "../apiEndpoints";
import { AddEditQuotationProps } from "../getQuotationTypes";

const addQuotationAPI = async ({
  quotation,
}: AddEditQuotationProps) => {

  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: quotation,
  }
  return fetchInterceptor(url, options)
};
export default addQuotationAPI;
