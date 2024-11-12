import addNewsAPI from "./addNewsAPI";
import { AddEditNewsProps } from "../getNewsTypes";

const addNewsServices = async ({ header, news }: AddEditNewsProps): Promise<any> => {
  try {
    const res = await addNewsAPI({
      header: header,
      news: news,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default addNewsServices;
