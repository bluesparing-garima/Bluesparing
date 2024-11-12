import editMakeAPI from "./editMakeAPI";
import { AddEditMakeProps } from "../getMakesTypes";

const editMakeService = async ({ header, make }: AddEditMakeProps): Promise<any> => {
  try {
    const res = await editMakeAPI({
      header,
      make,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default editMakeService;
