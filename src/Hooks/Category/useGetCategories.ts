import { useEffect, useRef, useState } from "react";
import getCategoriesService from "../../api/Category/GetCategory/getCategoriesService";
import { ICategories } from "../../components/Admin/Category/ICategory";
import { GetCategoryProps } from "../../api/Category/getCategoryTypes";

export const defaultCategories: ICategories[] = [];

const useGetCategories = ({ header }: GetCategoryProps) => {
  const [categories, setCategories] =
    useState<ICategories[]>(defaultCategories);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getCategoriesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const categories = apiResponse.data.filter(
            (category: ICategories) => category.isActive === true
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

export default useGetCategories;
