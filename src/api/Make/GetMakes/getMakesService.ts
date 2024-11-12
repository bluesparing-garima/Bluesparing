import getMakesAPI from "./getMakesAPI";
import { GetMakeProps } from "../getMakesTypes";

const getMakesService = async ({ header }: GetMakeProps): Promise<any> => {
  try {
    const res = await getMakesAPI({
      header: header,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getMakesService;
