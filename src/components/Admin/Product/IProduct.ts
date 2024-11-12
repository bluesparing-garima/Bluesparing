export interface IProductForm {
  id?: string;
  categoryId?: string;
  categoryName?: string;
  productName?: string;
  isActive?:boolean;
  createdBy?: string;
  updatedBy?: string;
}
export interface IProductsVM {
  id?: string;
  categoryId?: string;
  categoryName?: string;
  productName?: string;
  isActive?:boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IProducts {
  _id?: string;
  categoryId?: string;
  categoryName?: string;
  productName?: string;
  isActive?:boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IProduct {
  status: string;
  data: IProducts[];
  message: string;
}
