import getCaseTypesAPI from "./getCaseTypesAPI";
import { GetCaseTypeProps } from "../getCaseTypes";
const getCaseTypeService = async ({ header }: GetCaseTypeProps): Promise<any> => {
  try {
    const res = await getCaseTypesAPI({
      header
    })
    return res
  } catch (error) {
    throw error
  }
};
export default getCaseTypeService;
