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
}

export interface IAccounts {
  _id?: string;
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
