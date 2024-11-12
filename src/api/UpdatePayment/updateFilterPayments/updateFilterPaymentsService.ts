import updateFilterPaymentsAPI from "./updateFilterPaymentsAPI";
import { updateFilterPaymentsTypeProps } from "../getCalculatationTypes";

const updateFilterPaymentsService = async ({
  header,
  policyData,
}: updateFilterPaymentsTypeProps):Promise<any> => {

  try {
    const resData = await updateFilterPaymentsAPI({
      header,
      policyData,
    })
    return resData;
  } catch (error) {
    throw error;
  }


};

export default updateFilterPaymentsService;
