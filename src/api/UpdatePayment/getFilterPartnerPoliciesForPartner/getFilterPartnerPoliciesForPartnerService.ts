import getFilterPartnerPoliciesForPartnerAPI from "./getFilterPartnerPoliciesForPartnerAPI";
import { GetFilterPartnerPoliciesForPartnerTypeProps } from "../getCalculatationTypes";

const getFilterPartnerPoliciesForPartnerService = async (
  props: GetFilterPartnerPoliciesForPartnerTypeProps
): Promise<any> => {
  try {
    const filterRecord = await getFilterPartnerPoliciesForPartnerAPI(props)
    return filterRecord
  } catch (error) {
    throw error;
  }

};

export default getFilterPartnerPoliciesForPartnerService;


