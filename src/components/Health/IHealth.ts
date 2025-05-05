export interface IHealth {
  _id?: string;
  createdBy?: string;
  customerId: string;
  categoryId?: string;
  insuranceCompanyId?: string;
  tpaCompanyId?: string;
  name: string;
  policyNo?: string;
  type?: string;
  startDate: string;
  endDate: string;
  sumInsured: number;
  premium: number;
  paymentMode?: string;
  paymentDate?: string;
  commissionPercentage?: number;
  commissionAmount?: number;
  notes?: string;
  file?: string;
  paymentDone?: boolean;
  nominationDone?: boolean;
  active?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IHealthVM extends IHealth {
  _id: string;
  createdBy: string;
  categoryName?: string;
  customerName?: string;
  insuranceCompanyName?: string;
  tpaCompanyName?: string;
}


export interface IAddEditHealthForm {
  _id?:string;
  policyNumber: string;
  policyType: string;
  caseType: string;
  product: string;
  companyId: string;
  brokerId: string;
  partnerId: string;
  issueDate: string; 
  endDate: string;  
  relationshipManagerId:string;
  firstPurchasedDate: string; 
  totalSumInsured: string;
  netPremium: string;
  finalPremium: string;
  cumulativeBonus: string;
  accumulativeBonus: string;
  fullName: string;
  emailId: string;
  phoneNumber: string;
  paymentMode: string;
  paymentDetails: string;
}

export interface IPDFHealthForm {
  _id: string;
  customerName: string;
  insuranceCompanyName?: string;
  tpaCompanyName?: string;
  categoryName?: string;
  policyNo?: string;
  startDate: string;
  endDate: string;
  sumInsured: number;
  premium: number;
  paymentMode?: string;
  paymentDate?: string;
  commissionPercentage?: number;
  commissionAmount?: number;
  notes?: string;
  paymentDone?: boolean;
  nominationDone?: boolean;
  active?: boolean;
}

export interface IHealthPayments {
  _id?: string;
  policyId?: string;
  amount: number;
  paymentDate: string;
  mode?: string;
  note?: string;
  active?: boolean;
}


export interface ICompany {
  _id: string;
  companyName: string;
}

export interface IBroker {
  _id: string;
  brokerCode: string;
  brokerName: string;
}

export interface IPartner {
  _id: string;
  name: string;
  userCode: string;
}

export interface IRelationshipManager {
  _id: string;
  name: string;
  userCode: string;
}

export interface IHealthPolicy {
  _id: string;
  policyNumber: string;
  policyType: string;
  caseType: string;
  productType: string;
  companyId: ICompany;
  brokerId: IBroker;
  issueDate: string; 
  endDate: string;
  totalSumInsured: number;
  netPremium: number;
  finalPremium: number;
  firstPurchasedDate: string;
  renewalYear: string;
  accumulativeBonus: number;
  cumulativeBonus: number;
  fullName: string;
  emailId: string;
  phoneNumber: string;
  paymentMode: string;
  partnerId: IPartner;
  relationshipManagerId: IRelationshipManager;
  previousPolicy: string;
  createdAt: string;
  updatedAt: string;
 
}

export interface IHealthPolicyResponse{
  status:string;
  total:number;
  page:number;
  totalPages:number;
  count:number;
  data:IHealthPolicy[];
  
}