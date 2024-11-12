
import { GetExcelProps } from "../getUploadTypes";
import ExcelPayInApi from "./ExcelPayInApi";

const ExcelPayInService = async ({ header, excel }: GetExcelProps): Promise<any> => {
  try {
    const res = await ExcelPayInApi({
      excel: excel,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default ExcelPayInService;
