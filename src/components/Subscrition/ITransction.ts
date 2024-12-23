export interface ITransaction {
    _id?:string;
planId:string;
orderId:string;
userId:string;
transactionId:string;
planType:string;
planStartDate?:string;
planEndDate?:string;
transactionStatus:string;
isActive:boolean;
createdBy:string;

}
