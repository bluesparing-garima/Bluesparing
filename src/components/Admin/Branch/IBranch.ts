export interface IBranchForm {
    id?: string;
    branchName?: string;
    isActive?:boolean;
    createdBy?: string;
    updatedBy?: string;
  }
  
  export interface IBranchesVM {
    id?: string;
    branchName?: string;
    createdBy?: string;
    isActive?:boolean;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  export interface IBranches {
    _id?: string;
    branchName?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  
  export interface IBranch {
    status: string;
    data: IBranches[];
    message: string;
  }
  