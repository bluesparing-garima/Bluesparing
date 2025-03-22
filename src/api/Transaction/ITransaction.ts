
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
transactionStatus:boolean;
amount:number,
createdBy:string;
policyCount:number;
userLimit: Record<string, number|string>;
}
export interface IAddTransaction{
    data:AddTransactionProps
}