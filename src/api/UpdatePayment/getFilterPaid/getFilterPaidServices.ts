import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";
import getFilterPaidAPI from "./getFilterPaidAPI";

const getFilterPaidServices = async (
  props: getFilterPaidPartialUnpaidProps
):Promise<any>  => {
  try {
    const filterData = await getFilterPaidAPI(props)
    return filterData
  } catch (error) {
    throw error;
  }

};

export default getFilterPaidServices;
