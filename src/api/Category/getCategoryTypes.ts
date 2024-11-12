import { Header } from "../../Auth/IAuth";
import { ICategories, ICategoryForm } from "../../components/Admin/Category/ICategory";

export interface AddEditCategoryProps {
  header: Header;
  category: ICategoryForm;
}

export interface GetCategoryProps {
  header?: Header;
}

export interface GetCategoryDetailsProps {
  header?: Header;
  categoryId?: string;
}

export interface DeleteCategoryProps {
  header?: Header;
  categoryId?: string;
  categories: ICategories[];
}
