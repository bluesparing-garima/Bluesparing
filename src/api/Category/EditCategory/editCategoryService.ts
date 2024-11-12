import editCategoryAPI from "./editCategoryAPI";
import { AddEditCategoryProps } from "../getCategoryTypes";

const editCategoryService = async ({ header, category }: AddEditCategoryProps): Promise<any> => {
  try {
    const res = await editCategoryAPI({
      header,
      category,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default editCategoryService;
