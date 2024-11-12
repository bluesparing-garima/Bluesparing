import getNewsAPI from "./getNewsAPI";
import { GetNewsProps } from "../getNewsTypes";

const getNewsService = async ({ header }: GetNewsProps):Promise<any> => {
  try {
    const res = await getNewsAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error;
  }
 
};

export default getNewsService;
