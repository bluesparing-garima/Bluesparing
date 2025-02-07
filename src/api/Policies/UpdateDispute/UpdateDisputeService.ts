import {   UpdateDisputeProps } from "../getPoliciesTypes";
import UpdateDisputeAPI from "./UpdateDisputeAPI";

const UpdateDisputeService = async (payload: UpdateDisputeProps):Promise<any> => {
  try {
    const res = await  UpdateDisputeAPI(payload)
    return res;
  } catch (error) {
    throw error
  }
  
};

export default UpdateDisputeService;
