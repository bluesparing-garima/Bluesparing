import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IAccounts, IAccountsVM } from "../../components/Account/IAccounts";

const convertIAccountToIAccountVM = (data: IAccounts): IAccountsVM => {
  const accountViewModel: IAccountsVM = {
    id: data._id ? data._id : "",
    accountHolderName: data.accountHolderName! ? data.accountHolderName! : "",
    accountNumber: data.accountNumber! ? data.accountNumber! : "",
    IFSCCode: data.IFSCCode! ? data.IFSCCode! : "",
    accountCode: data.accountCode! ? data.accountCode! : "",
    bankName: data.bankName! ? data.bankName! : "",
    amount: data.amount! ? data.amount! : 0,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return accountViewModel;
};

export default convertIAccountToIAccountVM;
