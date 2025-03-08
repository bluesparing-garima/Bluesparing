import { AddPolicyProps } from "../getPoliciesTypes";
import addPolicyAPI from "./addPolicyAPI";

const addPolicyService = async ({ header, policy ,onProgress}: AddPolicyProps):Promise<any> => {
  try {
    const res = await  addPolicyAPI({
      header: header,
      policy: policy,
      onProgress
    })
    return res;
  } catch (error) {
    throw error
  }
  
};

export default addPolicyService;
