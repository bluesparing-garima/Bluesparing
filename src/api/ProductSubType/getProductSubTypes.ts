import { IProductSubTypeForm, IProductSubTypes } from "../../components/Admin/ProductSubType/IProductSubTypes";
  export interface AddEditProductSubTypeProps {
    header: any;
    productSubType: IProductSubTypeForm;
  }
  export interface GetProductSubTypeProps {
    header?: any;
  }
  export interface GetProductSubTypeDetailsProps {
    header?: any;
    productSubTypeId?: string;
  }
  export interface DeleteProductSubTypeProps {
    header?: any;
    productSubTypeId?: string;
    productSubTypes: IProductSubTypes[];
  }
  