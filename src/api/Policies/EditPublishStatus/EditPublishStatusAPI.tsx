import fetchInterceptor, {
  FetchOptions,
} from "../../../utils/fetchInterceptor ";
import { updatePublishedEp as endpoint } from "../apiEndpoints";
import { EditPolicyPublishStatus } from "../getPoliciesTypes";

const EditPublishStatusAPI = async ({
  header,
  isPublished,
  policyNumber,
}: EditPolicyPublishStatus) => {
  const url = endpoint();
  const options: FetchOptions = {
    method: "PATCH",
    body: JSON.stringify({
      isPublished,
      policyNumber,
    }),
  };
  return fetchInterceptor(url, options);
};

export default EditPublishStatusAPI;
