import { getFilterPaidPartialUnpaidProps } from "../getCalculatationTypes";
import getFilterUnpaidPartialAPI from "./getFilterUnpaidPartialAPI";

const getFilterUnpaidPartialServices = async (
  props: getFilterPaidPartialUnpaidProps
):Promise<any >=> {
  try {
    const filterRecord = await getFilterUnpaidPartialAPI(props);
    return filterRecord;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `getFilterPartnerPoliciesForPartnerAPI failed with error = ${error.message}`
      );
    } else {
      console.error('An unknown error occurred', error);
    }
    throw error;
  }
};

export default getFilterUnpaidPartialServices;
