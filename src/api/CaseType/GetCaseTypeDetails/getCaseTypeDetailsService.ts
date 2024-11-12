import getCaseTypeDetailsAPI from "./getCaseTypeDetailsAPI";
import { GetCaseTypeDetailsProps } from "../getCaseTypes";
import convertICaseTypeToICaseTypeVM from "../convertICaseTypetoICaseTypeVM";
import { ICaseTypes, ICaseTypesVM } from "../../../components/Admin/CaseType/ICaseTypes";
import { IResponse } from "../../IResponse";
const getCaseTypeDetailsService = async ({
  header,
    caseTypeId,
}: GetCaseTypeDetailsProps):Promise<ICaseTypesVM> => {
  try {
    const res = await getCaseTypeDetailsAPI({
      header: header,
      caseTypeId: caseTypeId,
    })as IResponse<ICaseTypes>;
    const caseTypes = convertICaseTypeToICaseTypeVM(res.data);
    return caseTypes;
  } catch (error) {
    throw error
  }
};
export default getCaseTypeDetailsService;
