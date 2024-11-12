import PayInExcelAPI from "./PayInExcelAPI";
import { GetExcelProps } from "../getUploadTypes";

const PayInExcelService = async ({ header, excel }: GetExcelProps): Promise<any> => {
  try {
    const res = await PayInExcelAPI({
      header: header,
      excel: excel,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default PayInExcelService;
