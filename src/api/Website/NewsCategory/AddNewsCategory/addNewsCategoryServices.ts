import addNewsCategoryAPI from "./addNewsCategoryAPI";
import { AddEditNewsCategoryProps } from "../getNewsCategoryTypes";

const addNewsCategoryServices = async ({
  header,
  category,
}: AddEditNewsCategoryProps): Promise<any> => {
  try {
    const res = await addNewsCategoryAPI({
      header: header,
      category: category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default addNewsCategoryServices;
