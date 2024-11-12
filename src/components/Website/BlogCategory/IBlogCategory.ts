export interface IBlogCategoryForm {
  id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}
export interface IBlogCategoriesVM {
  id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IBlogCategories {
  _id?: string;
  category?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IBlogCategory {
  status: string;
  data: IBlogCategories[];
  message: string;
}
