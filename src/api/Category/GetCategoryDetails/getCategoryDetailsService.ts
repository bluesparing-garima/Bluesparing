import getCategoryDetailsAPI from "./getCategoryDetailsAPI";
import { GetCategoryDetailsProps } from "../getCategoryTypes";
import convertICategoryToICategoryVM from "../convertICategoryToICategoryVM";
import { ICategories, ICategoriesVM } from "../../../components/Admin/Category/ICategory";
import { IResponse } from "../../IResponse";

const getCategoryDetailsService = async ({
  header,
  categoryId,
}: GetCategoryDetailsProps): Promise<ICategoriesVM> => {
  try {
    const res = await getCategoryDetailsAPI({
      header: header,
      categoryId: categoryId,
    })as IResponse<ICategories>
    const products = convertICategoryToICategoryVM(res.data);
    return products;
  } catch (error) {
    throw error
  }

};

export default getCategoryDetailsService;
