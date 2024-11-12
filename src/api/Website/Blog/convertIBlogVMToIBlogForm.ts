import {
  IBlogForm,
  IBlogVM,
} from "../../../components/Website/Blog/Blogs/IBlogs";
export const convertIBlogVMToIBlogForm = (blog: IBlogVM): IBlogForm => {
  const blogForm: IBlogForm = {
    id: blog.id!,
    category: blog.category!,
    categoryId: blog.categoryId!,
    title: blog.title!,
    description: blog.description!,
    author: blog.author!,
    image: blog.image!,
    website: blog.website!,
    date: blog.date!,
    isActive: !!blog.isActive,
    updatedBy: blog.updatedBy!,
    createdBy: blog.createdBy!,
  };
  return blogForm;
};
