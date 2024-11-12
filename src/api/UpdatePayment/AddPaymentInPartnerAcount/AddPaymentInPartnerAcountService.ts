import { addAmountInPartnerProps } from "../getCalculatationTypes";
import addPaymentInPartnerAcountAPI from "./AddPaymentInPartnerAcountAPI";

const AddPaymentInPartnerAcountService = async ({ header, startDate, endDate, partnerId, accountId, partnerBalance, payOutAmount }: addAmountInPartnerProps): Promise<any> => {
  try {
    const newProductSubType = await addPaymentInPartnerAcountAPI({
      header,
      startDate, endDate, partnerId, accountId, partnerBalance, payOutAmount
    });
    return newProductSubType;
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

export default AddPaymentInPartnerAcountService;