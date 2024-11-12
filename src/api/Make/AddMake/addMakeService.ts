import addMakeAPI from "./addMakeAPI";
import { AddEditMakeProps } from "../getMakesTypes";

const addMakeService = async ({ header, make }: AddEditMakeProps):Promise<any> => {
  try {
    const res = await addMakeAPI({
      header: header,
      make: make,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addMakeService;
