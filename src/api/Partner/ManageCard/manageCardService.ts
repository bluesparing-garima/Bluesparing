import manageCardAPI from "./manageCardAPI";
import { GetPartnerCardDetailsProps } from "../getPartnersTypes";

const manageCardService = async ({
  header,
  partnerId,
}: GetPartnerCardDetailsProps): Promise<any> => {

  try {
    const res = await manageCardAPI({
      header: header,
      partnerId: partnerId,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default manageCardService;
