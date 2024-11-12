import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../../context/constant";
import { IBlog, IBlogVM } from "../../../components/Website/Blog/Blogs/IBlogs";

const convertIBlogToIBlogVM = (data: IBlog): IBlogVM => {
  const blogViewModel: IBlogVM = {
    id: data._id ? data._id : "",
    category: data.category ? data.category : "",
    categoryId: data.categoryId ? data.categoryId : "",
    title: data.title ? data.title : "",
    author: data.author ? data.author : "",
    description: data.description ? data.description : "",
    image: data.image ? data.image : "",
    website: data.website ? data.website : "",
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    date: data.date ? dayjs(data?.date).format(DAYJS_DISPLAY_FORMAT) : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return blogViewModel;
};

export default convertIBlogToIBlogVM;
