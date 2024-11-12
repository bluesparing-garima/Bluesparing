import deleteMakeAPI from "./deleteMakeAPI";
import { DeleteMakeProps } from "../getMakesTypes";

const deleteMakeService = async ({
  header,
  makeId,
  makes,
}: DeleteMakeProps): Promise<any> => {
  try {
    await deleteMakeAPI({
      header,
      makeId,
      makes,
    })
    const deletedMakeIndex = makes.findIndex((make) => make._id === makeId);
    makes.splice(deletedMakeIndex, 1);
    return makes;
  } catch (error) {
    throw error
  }

};

export default deleteMakeService;
