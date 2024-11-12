import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import {
  ICreditDebits,
  ICreditDebitsVM,
} from "../../components/Account/CreditDebit/ICreditDebits";

const convertICreditDebitToICreditDebitVM = (
  data: ICreditDebits
): ICreditDebitsVM => {
  const creditDebitViewModel: ICreditDebitsVM = {
    id: data._id ? data._id : "",
    type: data.type! ? data.type! : "",
    accountType: data.accountType! ? data.accountType! : "",
    accountId: data.accountId! ? data.accountId! : "",
    accountCode: data.accountCode! ? data.accountCode! : "",
    brokerId: data.brokerId! ? data.brokerId! : "",
    brokerName: data.brokerName! ? data.brokerName! : "",
    partnerId: data.partnerId! ? data.partnerId! : "",
    partnerName: data.partnerName! ? data.partnerName! : "",
    remarks: data.remarks! ? data.remarks! : "",
    policyNumber: data.policyNumber! ? data.policyNumber! : "",
    distributedDate: data.distributedDate! ? data.distributedDate! : "",
    startDate: data.startDate! ? data.startDate! : "",
    endDate: data.endDate! ? data.endDate! : "",
    amount: data.amount! ? data.amount! : 0,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    partnerBalance: data.partnerBalance ? data.partnerBalance : 0,
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return creditDebitViewModel;
};

export default convertICreditDebitToICreditDebitVM;
