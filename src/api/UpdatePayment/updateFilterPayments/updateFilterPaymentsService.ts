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

export default updateFilterPaymentsService;
