import editNewsAPI from "./editNewsAPI";
import { AddEditNewsProps } from "../getNewsTypes";

const editNewsService = async ({ header, news, newsId }: AddEditNewsProps): Promise<any> => {
  try {
    const res = await editNewsAPI({
      header,
      news,
      newsId,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default editNewsService;
