import PayOutExcelAPI from "./PayOutExcelAPI";
import { GetExcelProps } from "../getUploadTypes";

const PayOutExcelService = async ({ header, excel }: GetExcelProps): Promise<any> => {

  try {
    const res = await PayOutExcelAPI({
      header: header,
      excel: excel,
    })

    return res;
  } catch (error) {
    throw error
  }

};

export default PayOutExcelService;
