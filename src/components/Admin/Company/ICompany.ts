export interface ICompanyForm {
    id?: string;
    companyName?: string;
    isActive?:boolean;
    createdBy?: string;
    updatedBy?: string;
  }
  
  export interface ICompaniesVM {
    id?: string;
    companyName?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  export interface ICompanies {
    _id?: string;
    companyName?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  
  export interface ICompany {
    status: string;
    data: ICompanies[];
    message: string;
  }
  