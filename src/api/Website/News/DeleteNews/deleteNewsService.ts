import deleteNewsAPI from "./deleteNewsAPI";
import { DeleteNewsProps } from "../getNewsTypes";

const deleteNewsService = async ({ header, newsId, news }: DeleteNewsProps):Promise<any> => {
  try {
    await deleteNewsAPI({
      header,
      newsId,
      news,
    })
    const deletedIndex = news.findIndex((news) => news._id === newsId);
    news.splice(deletedIndex, 1);
    return news;
  } catch (error) {
    throw error;
  }
 
};

export default deleteNewsService;
