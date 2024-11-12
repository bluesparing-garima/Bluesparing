import { getTotalProps } from "../getYearlyPayoutType";
import TotalPayOutLeftDistAPI from "./TotalPayOutLeftDistAPI";

const TotalPayOutLeftDistService = async ({
  header,
  category,
}: getTotalProps):Promise<any> => {
  try {
    const res = await TotalPayOutLeftDistAPI({
      header: header,
      category,
    })
    return res;
  } catch (error) {
    throw error;
  }

};

export default TotalPayOutLeftDistService;
