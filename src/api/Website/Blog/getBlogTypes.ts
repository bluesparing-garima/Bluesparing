import { Header } from "../../../Auth/IAuth";
import { IBlog } from "../../../components/Website/Blog/Blogs/IBlogs";
export interface AddEditBlogProps {
  header: Header;
  blog: any;
  blogId?: string;
}

export interface GetBlogProps {
  header?: Header;
}

export interface GetBlogDetailsProps {
  header?: Header;
  blogId?: string;
}

export interface DeleteBlogProps {
  header?: Header;
  blogId?: string;
  blogs: IBlog[];
}
