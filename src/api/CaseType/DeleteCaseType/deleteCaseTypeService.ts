import deleteCaseTypeAPI from "./deleteCaseTypeAPI";
import { DeleteCaseTypeProps } from "../getCaseTypes";

const deleteCaseTypeService = async ({ header, caseTypeId, caseTypes }: DeleteCaseTypeProps):Promise<any> => {

  try {
    await deleteCaseTypeAPI({
      header,
      caseTypeId,
      caseTypes,
    })
    const deletedCaseTypeIndex = caseTypes.findIndex((caseType) => caseType._id === caseTypeId);
    caseTypes.splice(deletedCaseTypeIndex, 1);
    return caseTypes;
  } catch (error) {
    throw error
  }

};

export default deleteCaseTypeService;
