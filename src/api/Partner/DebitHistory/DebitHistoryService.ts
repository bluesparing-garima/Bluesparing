import DebitHistoryAPI from "./DebitHistoryAPI";
import { DebitPartnerProps } from "../getPartnersTypes";

const DebitHistoryService = async ({
  header,
  startDate,
  endDate,
  partnerId,
}: DebitPartnerProps): Promise<any> => {
  try {
    const res = await DebitHistoryAPI({
      header: header,
      partnerId: partnerId,
      startDate: startDate,
      endDate: endDate,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default DebitHistoryService;
