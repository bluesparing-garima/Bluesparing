import {  EditPublishPartnerProps } from "../getPoliciesTypes";
import PublishPolicyAPI from "./PublishPolicyAPI";

const PublishPolicyServices = async (payload: EditPublishPartnerProps):Promise<any> => {
  try {
    const res = await  PublishPolicyAPI(payload)
    return res;
  } catch (error) {
    throw error
  }
  
};

export default PublishPolicyServices;
