
import { GetExcelProps } from "../getUploadTypes";
import PayInExcelAPI from "./ExcelPayOutAPI";

const ExcelPayOutService = async ({ header, excel }: GetExcelProps): Promise<any> => {
  try {
    const res = await PayInExcelAPI({
      excel: excel,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default ExcelPayOutService;
