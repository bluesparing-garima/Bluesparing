export interface INewsForm {
  id?: string;
  category?: string;
  categoryId?: string;
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
export interface INewsVM {
  id?: string;
  category?: string;
  categoryId?: string;
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
export interface INews {
  _id?: string;
  category?: string;
  categoryId?: string;
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
