import { EditPolicyPublishStatus } from "../getPoliciesTypes";
import EditPublishStatusAPI from "./EditPublishStatusAPI";

const EditPublishStatusService = async ({
  header,
  policyNumber,
  isPublished,
}: EditPolicyPublishStatus): Promise<any> => {
  try {
    const res = await EditPublishStatusAPI({
      header: header,
      policyNumber,
      isPublished,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default EditPublishStatusService;
