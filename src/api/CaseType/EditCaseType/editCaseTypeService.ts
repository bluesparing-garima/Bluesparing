import editCaseTypeAPI from "./editCaseTypeAPI";
import { AddEditCaseTypeProps } from "../getCaseTypes";
const editCaseTypeService = async ({ header, caseType }: AddEditCaseTypeProps): Promise<any> => {
  try {
    const res = await editCaseTypeAPI({
      header,
      caseType,
    })
    return res
  } catch (error) {
    throw error
  }
};
export default editCaseTypeService;
