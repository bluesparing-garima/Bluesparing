import { IAccountForm, IAccountsVM } from "../../components/Account/IAccounts";
export const convertIAccountVMToIAccountForm = (
  account: IAccountsVM
): IAccountForm => {
  const accountForm: IAccountForm = {
    id: account.id!,
    accountHolderName: account.accountHolderName!,
    accountNumber: account.accountNumber!,
    IFSCCode: account.IFSCCode!,
    accountCode: account.accountCode!,
    bankName: account.bankName!,
    amount: account.amount!,
    updatedBy: account.updatedBy!,
    isActive: !!account.isActive,
    createdBy: account.createdBy!,
  };
  return accountForm;
};
