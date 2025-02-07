import { IAccounts } from "../IAccounts";

export interface IUpdatePaymentPolicy {
  startDate?: string;
  endDate?: string;
  brokerName?: string;
}
export interface IUpdatePartnerPaymentPolicy {
  startDate?: string;
  endDate?: string;
  distributedDate?: string;
  partnerId?: string;
  remarks?: string;
}

export interface AddAccountProps{
  partnerId:string;
  handleAddAccountFlag: (flag: boolean) => void;
  handleAccountUpdate: (updateData: IAccounts) => void
}