import { addAmountInPartnerProps } from "../getCalculatationTypes";
import { addBalanceInPartner as endpoint } from "../apiEndpoints";
import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
const AddPaymentInPartnerAmountAPI = async ({ header, startDate,endDate,partnerId,accountId,partnerBalance,payOutAmount }: addAmountInPartnerProps) => {
  const url = endpoint()
    const options: FetchOptions = {
      method: "POST",
      headers: header,
      body:JSON.stringify({
        startDate,endDate,partnerId,accountId,partnerBalance,payOutAmount 
      })
    };
return fetchInterceptor(url,options)
};

export default AddPaymentInPartnerAmountAPI;

