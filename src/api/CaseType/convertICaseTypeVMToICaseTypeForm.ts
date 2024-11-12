import {
  ICaseTypeForm,
  ICaseTypesVM,
} from "../../components/Admin/CaseType/ICaseTypes";
export const convertICaseTypeVMToICaseTypeForm = (
  caseType: ICaseTypesVM
): ICaseTypeForm => {
  const caseTypeForm: ICaseTypeForm = {
    id: caseType.id!,
    caseType: caseType.caseType!,
    isActive: !!caseType.isActive,
    updatedBy: caseType.updatedBy!,
    createdBy: caseType.createdBy!,
  };
  return caseTypeForm;
};
