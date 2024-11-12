import { addAmountInPartnerProps } from "../getCalculatationTypes";
import addPaymentInPartnerAcountAPI from "./AddPaymentInPartnerAcountAPI";

const AddPaymentInPartnerAccountService = async ({ header, startDate, endDate, partnerId, accountId, partnerBalance, payOutAmount }: addAmountInPartnerProps): Promise<any> => {
  try {
    const newProductSubType = await addPaymentInPartnerAcountAPI({
      header,
      startDate, endDate, partnerId, accountId, partnerBalance, payOutAmount
    });
    return newProductSubType;
  } catch (error) {
    throw error;
  }

};

export default AddPaymentInPartnerAccountService;