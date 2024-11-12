// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import {
  ICreditDebitForm,
  ICreditDebitsVM,
} from "../../components/Account/CreditDebit/ICreditDebits";
//import { convertLocaleStringToNumber } from "../../utils/convertLocaleStringToNumber";

export const convertICreditDebitVMToICreditDebitForm = (
  creditDebit: ICreditDebitsVM
): ICreditDebitForm => {
  const creditDebitForm: ICreditDebitForm = {
    id: creditDebit.id!,
    type: creditDebit.type!,
    accountType: creditDebit.accountType!,
    accountId: creditDebit.accountId!,
    accountCode: creditDebit.accountCode!,
    brokerId: creditDebit.brokerId!,
    brokerName: creditDebit.brokerName!,
    partnerId: creditDebit.partnerId!,
    partnerName: creditDebit.partnerName!,
    remarks: creditDebit.remarks!,
    policyNumber: creditDebit.policyNumber!,
    distributedDate: creditDebit.distributedDate!,
    startDate: creditDebit.startDate!,
    endDate: creditDebit.endDate!,
    partnerBalance: creditDebit.partnerBalance!,
    amount: creditDebit.amount!,
    updatedBy: creditDebit.updatedBy!,
    isActive: !!creditDebit.isActive,
    createdBy: creditDebit.createdBy!,
    // amount: creditDebit.amount
    //   ? convertLocaleStringToNumber(creditDebit.amount)
    //   : 0,
  };
  return creditDebitForm;
};
