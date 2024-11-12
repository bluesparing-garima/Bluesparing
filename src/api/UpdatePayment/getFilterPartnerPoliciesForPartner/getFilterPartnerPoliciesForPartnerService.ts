import getFilterPartnerPoliciesForPartnerAPI from "./getFilterPartnerPoliciesForPartnerAPI";
import { GetFilterPartnerPoliciesForPartnerTypeProps } from "../getCalculatationTypes";

const getFilterPartnerPoliciesForPartnerService = async (
  props: GetFilterPartnerPoliciesForPartnerTypeProps
): Promise<any> => {
  try {
    const filterRecord = await getFilterPartnerPoliciesForPartnerAPI(props)
    return filterRecord
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

export default getFilterPartnerPoliciesForPartnerService;


