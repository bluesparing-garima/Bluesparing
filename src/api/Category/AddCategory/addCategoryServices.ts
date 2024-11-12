import addCategoryAPI from "./addCategoryAPI";
import { AddEditCategoryProps } from "../getCategoryTypes";

const addCategoryServices = async ({
  header,
  category,
}: AddEditCategoryProps): Promise<any> => {

  try {
    const res = await addCategoryAPI({
      header: header,
      category: category,
    })
    return res
  } catch (error) {
    throw error
  }


};

export default addCategoryServices;
