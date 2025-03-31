import fetchInterceptor,{FetchOptions} from "../../../utils/fetchInterceptor ";
import { getPolicyCountEndpoint as endpoint } from "../apiEndpoints";
import { getPolicyCountProps } from "../getPoliciesTypes";
type PolicyCountResponse = {
    remainingPolicyCount: number; // Adjust this based on the actual API response
  };
const getPolicyCountAPI = async ({ userId }: getPolicyCountProps) => {
  const url = endpoint();
  const options: FetchOptions = {
    method: "GET",
  };



const response =  await fetchInterceptor(url, options);
return response as PolicyCountResponse;
};

export default getPolicyCountAPI;
