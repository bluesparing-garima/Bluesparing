import { useEffect, useRef, useState } from "react";
import { INewsCategories } from "../../../components/Website/NewsCategory/INewsCategory";
import { GetNewsCategoryProps } from "../../../api/Website/NewsCategory/getNewsCategoryTypes";
import getNewsCategoriesService from "../../../api/Website/NewsCategory/GetNewsCategory/getNewsCategoriesService";
export const defaultCategories: INewsCategories[] = [];

const useGetNewsCategories = ({ header }: GetNewsCategoryProps) => {
  const [categories, setCategories] =
    useState<INewsCategories[]>(defaultCategories);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getNewsCategoriesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const categories = apiResponse.data.filter(
            (category: INewsCategories) => category.isActive === true
          );
          setCategories(categories);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [categories];
};

export default useGetNewsCategories;
