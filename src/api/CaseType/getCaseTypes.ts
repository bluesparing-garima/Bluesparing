
import {
  ICaseTypes,
  ICaseTypeForm,
} from "../../components/Admin/CaseType/ICaseTypes";

export interface AddEditCaseTypeProps {
  header: any;
  caseType: ICaseTypeForm;
}

export interface GetCaseTypeProps {
  header?: any;
}

export interface GetCaseTypeDetailsProps {
  header?: any;
  caseTypeId?: string;
}

export interface DeleteCaseTypeProps {
  header?: any;
  caseTypeId?: string;
  caseTypes: ICaseTypes[];
}
