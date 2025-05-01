// import { AddPolicyProps } from "../getPoliciesTypes";
import { AddPolicyProps } from "../../Policies/getPoliciesTypes";
import addHealthPolicyAPI from "./addHealthPolicyAPI";

const addHealthPolicyService = async ({ header, policy ,onProgress}: AddPolicyProps):Promise<any> => {
  try {
    const res = await  addHealthPolicyAPI({
      header: header,
      policy: policy,
      onProgress
    })
    return res;
  } catch (error) {
    throw error
  }
  
};

export default addHealthPolicyService;
