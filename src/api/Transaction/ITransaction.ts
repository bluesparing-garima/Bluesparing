
export interface ITransactionGet {
    header: any
}

export interface AddTransactionProps {
transactionId:string;
planId:string;
orderId:string;
userId:string;
planType:string;
planStartDate:string;
planEndDate:string;
transactionStatus:string;
createdBy:string;
}
export interface IAddTransaction{
    data:AddTransactionProps
}
