import React from "react";
import { IBrokers } from "../../Admin/Broker/IBroker";
import { IAccounts } from "../IAccounts";
import { IPartners } from "../../Partner/IPartner";
export interface TdsWrapper {
    children: React.ReactNode;
    title: string;
}
export interface ITdsPayInForms {
    broker: IBrokers;
    accountCode: IAccounts;
    startDate: string;
    endDate: string;
    distributedDate: string;
    remarks: string;
}
export interface ITdsPayOutForms {
    partner: IPartners;
    accountCode: IAccounts;
    startDate: string;
    endDate: string;
    distributedDate: string;
    remarks: string;
}
export interface ITdsType {
    _id: string;
    transactionCode: string;
    accountType: "Tds" | string;
    type: "credit" | "debit" | string;
    credit: number;
    debit: number;
    accountId: string;
    receiverAccountId: string;
    accountCode: string;
    partnerId: string;
    partnerName: string;
    brokerId: string | null;
    brokerName: string | null;
    remarks: string;
    policyNumber: string | null;
    startDate: string;
    endDate: string;
    distributedDate: string;
    employeeId: string | null;
    employeeName: string | null;
    tdsAmount: number;
    tdsPercentage: number;
    totalAmountWithTds: number;
    tdsProcessed: boolean;
    createdOn: string;
    createdBy: string | null;
    updatedOn: string | null;
    receiverPan?:string;
    receiverIFSCCode?:string;
    receiverAccountNumber?:string;
    receiverBankName?:string;
    receiverAccountCode?:string;
    receiverName?:string;
}


export interface PolicyTdsPayOutProps {
    policies: ITdsType[];
    accountId: string;
    endDate: string;
    startDate: string;
    accountCode: string;
    distributedDate: string;
    balanceInAccount: number;
    remarks: string;
  }

  export interface PolicyTdsPyInProps {
    policies: ITdsType[];
    accountId: string;
    endDate: string;
    startDate: string;
    accountCode: string;
    distributedDate: string;
    balanceInAccount: number;
    remarks: string;
  }