import getCategoriesAPI from "./getCategoriesAPI";
import { GetCategoryProps } from "../getCategoryTypes";

const getCategoriesService = async ({ header }: GetCategoryProps): Promise<any> => {
  try {
    const res = await getCategoriesAPI({
      header: header,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getCategoriesService;
