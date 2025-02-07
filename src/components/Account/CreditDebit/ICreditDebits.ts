export interface ICreditDebitForm {
  id?: string;
  accountType?: string; //credit -debit
  type?: string; //payin -Payout
  accountId?: string; //id
  accountCode?: string;
  amount?: number;
  credit?: number;
  debit?: number;
  remarks?: string;
  brokerName?: string;
  brokerId?: string;
  partnerId?: string;
  partnerName?: string;
  startDate?: string;
  endDate?: string;
  policyNumber?: string;
  employeeName?: string;
  employeeId?: string;
  partnerBalance?: number;
  brokerBalance?: number;
  distributedDate?: string;
  isActive?: boolean;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  transactionCode?:string;
  tdsPercentage?:number;
  tdsAmount?:number;
  receiverAccountId?:string;
  receiverAccountCode?:string;
  totalAmountWithTds?:number;
}

export interface ICreditDebits {
  _id?: string;
  transactionCode?: string;
  accountType?: string; //credit -debit
  type?: string; //payin -Payout
  accountId?: string; //id
  accountCode?: string;
  credit?: number;
  debit?: number;
  amount?: number;
  remarks?: string;
  brokerName?: string;
  brokerId?: string;
  partnerId?: string;
  partnerName?: string;
  startDate?: string;
  endDate?: string;
  policyNumber?: string;
  employeeName?: string;
  employeeId?: string;
  isActive?: boolean;
  partnerBalance?: number;
  brokerBalance?: number;
  distributedDate?: string;
  tdsAmount?:number;
  tdsPercentage?:number;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  accountBalance?:number
}
export interface ICreditDebitsVM {
  id?: string;
  transactionCode?: string;
  accountType?: string; //credit -debit
  type?: string; //payin -Payout
  accountId?: string; //id
  accountCode?: string;
  amount?: number;
  credit?: number;
  debit?: number;
  remarks?: string;
  brokerName?: string;
  brokerId?: string;
  partnerId?: string;
  partnerName?: string;
  startDate?: string;
  endDate?: string;
  policyNumber?: string;
  employeeName?: string;
  employeeId?: string;
  partnerBalance?: number;
  distributedDate?: string;
  tdsAmount?:number;
  tdsPercentage?:number;
  isActive?: boolean;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
}

export interface ICreditDebit {
  status: string;
  data: ICreditDebits[];
  message: string;
}
export interface IGetBrokerCreditDebitPolicy {
  startDate?: string;
  endDate?: string;
  brokerName?: string;
}
export interface IGetPartnerCreditDebitPolicy {
  startDate?: string;
  endDate?: string;
  partnerName?: string;
}
