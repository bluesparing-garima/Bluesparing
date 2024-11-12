import getNewsDetailsAPI from "./getNewsDetailsAPI";
import { GetNewsDetailsProps } from "../getNewsTypes";
import convertINewsToINewsVM from "../convertINewsToINewsVM";
import { INewsVM } from "../../../../components/Website/News/News/INews";

const getNewsDetailsService = async ({
  header,
  newsId,
}: GetNewsDetailsProps): Promise<INewsVM> => {
  try {
    const res = await getNewsDetailsAPI({
      header: header,
      newsId: newsId,
    })
    return convertINewsToINewsVM(res);
  } catch (error) {
    throw error;
  }

};

export default getNewsDetailsService;
