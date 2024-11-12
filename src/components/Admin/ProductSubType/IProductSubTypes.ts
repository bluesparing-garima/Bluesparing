export interface IProductSubTypeForm {
    id?: string;
    productId?: string;
    productName?: string;
    productSubType?: string;
    isActive?:boolean;
    createdBy?: string;
    updatedBy?: string;
  }
  
  export interface IProductSubTypesVM {
    id?: string;
    productId?: string;
    productName?: string;
    productSubType?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
    forceUpdate?: number;
  }
  export interface IProductSubTypes {
    _id?: string;
    productId?: string;
    productName?: string;
    productSubType?: string;
    isActive?:boolean;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  
  export interface IProductSubType {
    status: string;
    data: IProductSubTypes[];
    message: string;
  }
  