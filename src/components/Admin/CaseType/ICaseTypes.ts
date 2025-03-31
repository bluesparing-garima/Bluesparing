export interface ICaseTypeForm {
  id?: string;
  isActive?:boolean;
  caseType?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ICaseTypesVM {
  id?: string;
  caseType?: string;
  isActive?:boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface ICaseTypes {
  _id?: string;
  caseType?: string;
  createdBy?: string;
  isActive?:boolean;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface ICaseTypeResponse {
  status: string;
  data: ICaseTypes[];
  message: string;
}

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
