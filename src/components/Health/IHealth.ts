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
  id?: string;
  bookingId?: string; //bookingrequestId
  leadId?: string; //leadId
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  brokerId: string;
  brokerCode?: string;
  make: string; //company of vehicle
  model: string; //company vechicle model
  fuelType: string; //LPG
  rto: string; //
  vehicleNumber: string;
  seatingCapacity?: number;
  cc: number;
  weight?: number; //100o,2500
  ncb: string; //
  policyNumber: string;
  fullName: string;
  emailId: string;
  phoneNumber: number;
  vehicleAge?: string; //matter
  mfgYear: number;
  tenure: number;
  registrationDate: string;
  endDate: string;
  issueDate: string;
  idv: number|undefined;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  policyStatus?: string; //booked
  paymentDetails?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  rcFront?: string;
  rcBack?: string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  currentPolicy?: string;
  other?: string;
  policyCompletedBy: string; /// booking person id
  updatedOn?: any;
  createdOn?: string;
  createdBy?: any;
  updatedBy?: any;
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

export interface IViewHealthVM extends IHealthVM {
  payments: IHealthPayments[];
}
