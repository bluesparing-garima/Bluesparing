import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addLeadEndpoint as endpoint } from "../apiEndpoints";
import { AddEditLeadsProps } from "../getLeadsTypes";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addLeadsAPI = async ({  lead }: AddEditLeadsProps) => {
  lead.append("parentAdminId",UserData.parentAdminId);
  const url = endpoint()
  const options: FetchOptions = {
    method: "POST",
    body: lead,
  }

  return fetchInterceptor(url, options)

};

export default addLeadsAPI;
