export interface ICategoryForm {
    id?: string;
    categoryId?: string;
    categoryName?: string;
    isActive?:boolean;
    productName?: string;
    createdBy?: string;
    updatedBy?: string;
  }
  export interface ICategoriesVM {
    id?: string;
    categoryId?: string;
    categoryName?: string;
    isActive?:boolean;
    productName?: string;
    createdBy?: string;
    createdOn?: string;
    updatedOn?: string;
    updatedBy?: string;
  }
  export interface ICategories {
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
  export interface ICategory {
    status: string;
    data: ICategories[];
    message: string;
  }
  