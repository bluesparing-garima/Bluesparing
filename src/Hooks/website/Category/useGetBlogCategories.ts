import { useEffect, useRef, useState } from "react";
import { IBlogCategories } from "../../../components/Website/BlogCategory/IBlogCategory";
import { GetBlogCategoryProps } from "../../../api/Website/Category/getBlogCategoryTypes";
import getBlogCategoriesService from "../../../api/Website/Category/GetBlogCategory/getBlogCategoriesService";
export const defaultCategories: IBlogCategories[] = [];

const useGetBlogCategories = ({ header }: GetBlogCategoryProps) => {
  const [categories, setCategories] =
    useState<IBlogCategories[]>(defaultCategories);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getBlogCategoriesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const categories = apiResponse.data.filter(
            (category: IBlogCategories) => category.isActive === true
          );
          setCategories(categories);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [categories];
};

export default useGetBlogCategories;
