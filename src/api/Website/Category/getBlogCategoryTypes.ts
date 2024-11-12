import { Header } from "../../../Auth/IAuth";
import { IBlogCategories, IBlogCategoryForm } from "../../../components/Website/BlogCategory/IBlogCategory";
export interface AddEditBlogCategoryProps {
  header: Header;
  category: IBlogCategoryForm;
}

export interface GetBlogCategoryProps {
  header?: Header;
}

export interface GetBlogCategoryDetailsProps {
  header?: Header;
  categoryId?: string;
}

export interface DeleteBlogCategoryProps {
  header?: Header;
  categoryId?: string;
  categories: IBlogCategories[];
}
