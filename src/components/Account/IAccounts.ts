import { IPartners } from "../Partner/IPartner";

export interface IAccountForm {
  id?: string;
  accountNumber?: string;
  accountHolderName?: string;
  accountCode?: string;
  bankName?: string;
  amount?: number;
  IFSCCode?: string;
  isActive?: boolean;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  roleName?: string;
  partnerId?: string;
  partner?: IPartners;
  pan?: string;

}

export interface IAccounts {
  _id?: string;
  accountNumber?: string;
  accountHolderName?: string;
  accountCode?: string;
  bankName?: string;
  amount?: number;
  roleName?: string;
  IFSCCode?: string;
  isActive?: boolean;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
}
export interface IAccountsVM {
  id?: string;
  accountNumber?: string;
  accountHolderName?: string;
  accountCode?: string;
  bankName?: string;
  amount?: number;
  IFSCCode?: string;
  isActive?: boolean;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
}
export interface IAccount {
  status: string;
  data: IAccounts[];
  message: string;
}
export interface IAccountTransfer {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  startDate: string;
  endDate: string;
  distributedDate: string;
  remarks: string;
};
