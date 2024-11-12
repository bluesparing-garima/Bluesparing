export interface IPolicyTypeForm {
    id?: string;
    policyType?: string;
    isActive?:boolean;
    createdBy?: string;
    updatedBy?: string;
  }
  
  export interface IPolicyTypesVM {
    id?: string;
    policyType?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  export interface IPolicyTypes {
    _id?: string;
    policyType?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  
  export interface IPolicyType {
    status: string;
    data: IPolicyTypes[];
    message: string;
  }
  