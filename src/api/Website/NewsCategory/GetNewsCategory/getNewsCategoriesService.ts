import getNewsCategoriesAPI from "./getNewsCategoriesAPI";
import { GetNewsCategoryProps } from "../getNewsCategoryTypes";

const getNewsCategoriesService = async ({ header }: GetNewsCategoryProps): Promise<any> => {
  try {
    const res = await getNewsCategoriesAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getNewsCategoriesService;
