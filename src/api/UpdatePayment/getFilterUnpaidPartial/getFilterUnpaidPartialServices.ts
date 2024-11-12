import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";
import getFilterUnpaidPartialAPI from "./getFilterUnpaidPartialAPI";

const getFilterUnpaidPartialServices = async (
  props: getFilterPaidPartialUnpaidProps
):Promise<any >=> {
  try {
    const filterRecord = await getFilterUnpaidPartialAPI(props);
    return filterRecord;
  } catch (error) {
    throw error;
  }
};

export default getFilterUnpaidPartialServices;
