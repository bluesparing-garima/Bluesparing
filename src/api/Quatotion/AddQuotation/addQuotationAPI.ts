import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addQuotationEndpoint as endpoint } from "../apiEndpoints";
import { AddEditQuotationProps } from "../getQuotationTypes";

let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addQuotationAPI = async ({
  quotation,
}: AddEditQuotationProps) => {
  quotation.append("parentAdminId",UserData.parentAdminId)
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: quotation,
  }
  return fetchInterceptor(url, options)
};
export default addQuotationAPI;
