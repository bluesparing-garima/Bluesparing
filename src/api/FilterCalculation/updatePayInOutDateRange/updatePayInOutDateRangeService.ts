import updatePayInOutDateRangeAPI from "./updatePayInOutDateRangeAPI";
import { UpdatePayInPayOutDateRangeProps } from "../getCalculatationTypes";

const updatePayInOutDateRangeService = async ({
  header,
  data,
}: UpdatePayInPayOutDateRangeProps): Promise<any> => {
  try {
    const res = await updatePayInOutDateRangeAPI({
      header,
      data,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default updatePayInOutDateRangeService;
