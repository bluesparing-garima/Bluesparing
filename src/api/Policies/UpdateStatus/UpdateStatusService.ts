import { changePolicyStatus } from "../getPoliciesTypes";
import UpdateStatusAPI from "./UpdateStatusAPI";

const UpdateStatusService = async ({
  header,
  policyId, status
}: changePolicyStatus): Promise<any> => {
  try {
    const res = await UpdateStatusAPI({
      header: header,
      policyId, status
    })
    return res
  } catch (error) {
    throw error
  }

};

export default UpdateStatusService;
