import { ReactNode } from "react";

export interface PolicyDetailsProps {
    policyNumber: string;
    productType: string;
    policyType: string;
    // partnerName:string;
    // vehicleNumber:string;
    // companyName:string;
    // make:string;
    // model:string;
    // registrationDate:string;
    // issueDate:string;
    // endDate:string;
    // policyRemarks?:string;
}

export interface PolicyPaymentsProps {
    // netPremium:number;

    payOutPaymentStatus: string;
    // payOutODPercentage:number;
    // payOutTPPercentage:number;
    payOutODAmount?: number;
    payOutTPAmount?: number;
    // payOutBalance:number;
    payOutCommission: number;
}
export interface PolicyDisputeData {
    policyId: string;
    policyNumber?: string;
    image?: string;
    comments?: string;
    status?: string;
    senderId?: string;
    senderName?: string;
    reciverId?: string;
    reciverName?: string;
    createdBy: string;
}
export interface ChatFeedBoxProps {
    disputeData: PolicyDisputeData[];
    policyId: string;
    policyNumber: string;
    handleDisputeData: (data: PolicyDisputeData) => void;
    isDispute:boolean|undefined;
    policyRemarks: string;
}
export interface MsgContentProps{
    msgSender?:string;
    msgData?:string;
    type?:string;

}
export interface PolicyDisputeWrapperProps{
    title:string;
    children:ReactNode;
    btnTxt?:string;
    btnHandler?:()=>void;
    isDispute?:boolean;
}