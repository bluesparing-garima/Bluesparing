import { SafeKaroUser } from "../../../context/constant";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { addPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyProps } from "../getPoliciesTypes";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
const addPolicyAPI = async ({ header, policy }: AddPolicyProps) => {
policy['parentAdminId'] = UserData.parentAdminId;
  const url = endpoint()
  const options: FetchOptions= {
    method: "POST",
    body: policy,
  }
  return fetchInterceptor(url, options)

};

export default addPolicyAPI;
