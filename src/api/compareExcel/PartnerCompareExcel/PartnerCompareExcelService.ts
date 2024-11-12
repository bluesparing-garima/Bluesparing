import PartnerCompareExcelAPI from "./PartnerCompareExcelAPI";
import { GetPartnerExcelProps } from "../getCompareTypes";

const PartnerCompareExcelService = async ({
  header,
  excel
}: GetPartnerExcelProps): Promise<any> => {
  try {
    const res = await PartnerCompareExcelAPI({
      header: header,
      excel: excel,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default PartnerCompareExcelService;
