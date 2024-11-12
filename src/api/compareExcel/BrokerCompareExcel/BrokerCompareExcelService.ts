import BrokerCompareExcelAPI from "./BrokerCompareExcelAPI";
import { GetBrokerExcelProps } from "../getCompareTypes";

const BrokerCompareExcelService = async ({
  header,
  excel
}: GetBrokerExcelProps): Promise<any> => {
  try {
    const res = await BrokerCompareExcelAPI({
      header: header,
      excel: excel,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default BrokerCompareExcelService;
