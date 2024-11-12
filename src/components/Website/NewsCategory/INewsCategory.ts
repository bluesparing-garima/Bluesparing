export interface INewsCategoryForm {
  id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}
export interface INewsCategoriesVM {
  id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface INewsCategories {
  _id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface INewsCategory {
  status: string;
  data: INewsCategories[];
  message: string;
}
