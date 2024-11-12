import getPayInExcelAPI from "./getPayInExcelAPI";
import { GetPayInExcelProps } from "../getPayTypes";

const getPayInExcelService = async ({ header }: GetPayInExcelProps): Promise<any> => {

  try {
    const res = await getPayInExcelAPI({
      header: header,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default getPayInExcelService;
