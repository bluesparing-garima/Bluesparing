import getNewsCategoryDetailsAPI from "./getNewsCategoryDetailsAPI";
import { GetNewsCategoryDetailsProps } from "../getNewsCategoryTypes";
import convertICategoryToICategoryVM from "../convertINewsCategoryToICategoryVM";
import { INewsCategoriesVM } from "../../../../components/Website/NewsCategory/INewsCategory";

const getNewsCategoryDetailsService = async ({
  header,
  categoryId,
}: GetNewsCategoryDetailsProps): Promise<INewsCategoriesVM> => {
  try {
    const res = await getNewsCategoryDetailsAPI({
      header: header,
      categoryId: categoryId,
    })
    return convertICategoryToICategoryVM(res)
  } catch (error) {
    throw error;
  }

};

export default getNewsCategoryDetailsService;
