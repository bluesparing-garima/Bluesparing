import getPayOutExcelAPI from "./getPayOutExcelAPI";
import { GetPayOutExcelProps } from "../getPayTypes";

const getPayOutExcelService = async ({ header }: GetPayOutExcelProps):Promise<any> => {
  try {
    const res = await getPayOutExcelAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getPayOutExcelService;
