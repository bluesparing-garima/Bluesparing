// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { INewsForm, INewsVM } from "../../../components/Website/News/News/INews";

export const convertINewsVMToINewsForm = (news: INewsVM): INewsForm => {
  const newsForm: INewsForm = {
    id: news.id!,
    category: news.category!,
    categoryId: news.categoryId!,
    title: news.title!,
    description: news.description!,
    author: news.author!,
    image: news.image!,
    website: news.website!,
    date: news.date!,
    isActive: !!news.isActive,
    updatedBy: news.updatedBy!,
    createdBy: news.createdBy!,
  };
  return newsForm;
};
