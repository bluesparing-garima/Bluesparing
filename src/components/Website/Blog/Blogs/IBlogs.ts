export interface IBlogForm {
  id?: string;
  category?: string;
  categoryId?:string;
  title?: string;
  image?: string;
  date?: string;
  description?: string;
  author?: string;
  website?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}
export interface IBlogVM {
  id?: string;
  category?: string;
  categoryId?:string;
  title?: string;
  image?: string;
  date?: string;
  description?: string;
  author?: string;
  website?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IBlog {
  _id?: string;
  category?: string;
  categoryId?:string;
  title?: string;
  image?: string;
  date?: string;
  description?: string;
  author?: string;
  website?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
