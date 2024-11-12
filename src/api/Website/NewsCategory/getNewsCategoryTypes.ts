import { Header } from "../../../Auth/IAuth";
import {
  INewsCategories,
  INewsCategoryForm,
} from "../../../components/Website/NewsCategory/INewsCategory";
export interface AddEditNewsCategoryProps {
  header: Header;
  category: INewsCategoryForm;
}

export interface GetNewsCategoryProps {
  header?: Header;
}

export interface GetNewsCategoryDetailsProps {
  header?: Header;
  categoryId?: string;
}

export interface DeleteNewsCategoryProps {
  header?: Header;
  categoryId?: string;
  categories: INewsCategories[];
}
