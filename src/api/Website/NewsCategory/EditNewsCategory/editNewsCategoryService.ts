import editNewsCategoryAPI from "./editNewsCategoryAPI";
import { AddEditNewsCategoryProps } from "../getNewsCategoryTypes";

const editNewsCategoryService = async ({
  header,
  category,
}: AddEditNewsCategoryProps): Promise<any> => {
  try {
    const res = await editNewsCategoryAPI({
      header,
      category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default editNewsCategoryService;
