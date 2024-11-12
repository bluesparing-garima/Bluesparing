import addCaseTypeAPI from "./addCaseTypeAPI";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const addCaseTypeService = async ({ header, caseType }: AddEditCaseTypeProps): Promise<any> => {
  try {
    const newCaseType = await addCaseTypeAPI({
      header,
      caseType,
    });
    return newCaseType;
  } catch (error) {
    throw error
  }
};

export default addCaseTypeService;
