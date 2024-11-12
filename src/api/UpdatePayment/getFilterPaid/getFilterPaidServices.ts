import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";
import getFilterPaidAPI from "./getFilterPaidAPI";

const getFilterPaidServices = async (
  props: getFilterPaidPartialUnpaidProps
):Promise<any>  => {
  try {
    const filterData = await getFilterPaidAPI(props)
    return filterData
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        ` ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }

};

export default getFilterPaidServices;
