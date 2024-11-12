export interface IPayInExcel {
  _id?: string;
  policyCategory?: string; //Motor health
  caseType?: string;
  companyName?: string;
  engine?: number;
  weight?: number;
  fuelType?: string;
  make?: string;
  model?: string;
  ncb?: string;
  od?: string;
  tp?: string;
  policyType?: string;
  productType?: string;
  rto?: string;
  subCategory?: string;
  startDate?: string;
  endDate?: string;
  //insuredType?:string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IPayInExcelVM {
  id?: string;
  policyCategory?: string; //Motor health
  caseType?: string;
  companyName?: string;
  engine?: number;
  weight?: number;
  fuelType?: string;
  make?: string;
  model?: string;
  ncb?: string;
  od?: string;
  tp?: string;
  policyType?: string;
  productType?: string;
  rto?: string;
  subCategory?: string;
  startDate?: string;
  endDate?: string;
  //insuredType?:string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IPayOutExcelVM {
  id?: string;
  policyCategory?: string; //Motor health
  caseType?: string;
  companyName?: string;
  engine?: number;
  weight?: number;
  fuelType?: string;
  make?: string;
  model?: string;
  ncb?: string;
  od?: string;
  tp?: string;
  policyType?: string;
  productType?: string;
  rto?: string;
  subCategory?: string;
  //insuredType?:string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  startDate?: string;
  endDate?: string;
}

export interface IPayOutExcel {
  _id?: string;
  policyCategory?: string; //Motor health
  caseType?: string;
  companyName?: string;
  engine?: number;
  weight?: number;
  fuelType?: string;
  make?: string;
  model?: string;
  ncb?: string;
  od?: string;
  tp?: string;
  policyType?: string;
  productType?: string;
  rto?: string;
  subCategory?: string;
  startDate?: string;
  endDate?: string;
  //insuredType?:string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IPercentagePolicy {
  _id?: string;
  fuelType?: string;
  policyType?: string;
  companyName?: string;
  productType?: string;
  subCategory?: string;
  cc?: number | null;
  weight?: number | null;
  broker: string;
  seatingCapacity?: number | null;
  ncb?: string;
  rto?: string;
  // insuredType?: string;
  caseType?: string;
  make?: string;
  model?: string;
  vehicleAge: string;
  startDate?: string;
  endDate?: string;
  payInODPercentage?: number;
  payInTPPercentage?: number;
  payOutODPercentage?: number;
  payOutTPPercentage?: number;
  partnerName?: string;
  partnerId?: string;
}
export interface IPercentagePolicyVM {
  id: string;
  fuelType?: string;
  policyType?: string;
  companyName?: string;
  productType?: string;
  subCategory?: string;
  cc?: number | null;
  weight?: number | null;
  broker: string;
  seatingCapacity?: number | null;
  ncb?: string;
  rto?: string;
  // insuredType?: string;
  caseType?: string;
  make?: string;
  model?: string;
  vehicleAge: string;
  startDate?: string;
  endDate?: string;
  payInODPercentage?: number;
  payInTPPercentage?: number;
  payOutODPercentage?: number;
  payOutTPPercentage?: number;
}
