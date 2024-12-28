export interface PolicyTypes {
  activityTypes: string[];
}

export interface IPolicies {
  status: string;
  data?: IPolicy;
  message?: string;
}

export interface IPolicy {
  _id?: string;
  bookingId?: string;
  uuid?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  brokerCode?: string;
  brokerId: string;
  make: string; //company of vehicle
  model: string; //company vechicle model
  fuelType: string; //LPG
  rto: string; //
  vehicleNumber: string;
  seatingCapacity?: number;
  cc: number; //1000cc,2500cc
  weight?: number; //
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
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  //documents: any[];
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
  policyCompletedBy: string;
  bookingTimer?: string;
  leadTimer?: string;
  bookingDate?: string;
  leadDate?: string;
  payInPaymentStatus?: string;
  payOutPaymentStatus?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
}

export interface IPolicyVM {
  id?: string;
  bookingId?: string;
  uuid?: string;
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
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  //documents: any[];
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
  bookingTimer?: string;
  leadTimer?: string;
  bookingDate?: string;
  leadDate?: string;
  policyCompletedBy: string;
  payInPaymentStatus?: string;
  payOutPaymentStatus?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
}

export interface IAddEditPolicyForm {
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
export interface IPDFPolicyForm {
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
  idv: number;
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
  currentPolicy?: any;
  policyCompletedBy: string; /// booking person id
  updatedOn?: any;
  createdOn?: string;
  createdBy?: any;
  updatedBy?: any;
}
export interface IPolicyPayments {
  status: string;
  data?: IPolicyPayment;
  message?: string;
}
export interface IPolicyPayment {
  _id?: string;
  od: number;
  tp: number;
  policyNumber?: string;
  policyDate?: string;
  partnerId?: string;
  policyId?: string;
  bookingId?: string;
  netPremium: number;
  finalPremium: number;
  payInODPercentage: number;
  payInTPPercentage: number;
  payInODAmount: number;
  payInTPAmount: number;
  payInCommission: number; //payInODAmount+payInTPAmount
  payOutODPercentage: number;
  payOutTPPercentage: number;
  payOutODAmount: number;
  payOutTPAmount: number;
  payOutCommission?: number; //payOutTPAmount+payOutODAmount
  payInAmount?: number;
  payOutAmount?: number;
  payInPaymentStatus?: string;
  policyCompletedByName?:string;
  payOutPaymentStatus?: string;
  payInBalance?: number;
  payOutBalance?: number;
  remarks?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  paymentCreatedBy?: string;
  paymentCreatedOn?: string;
  paymentUpdatedBy?: string;
  paymentUpdatedOn?: string;
}

export interface IViewPolicyVM {
  id?: string;
  policyId?: string;
  policyPaymentId?: string;
  bookingId?: string;
  uuid?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  brokerId: string;
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
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  // documents: any[];
  rcFront?: string;
  rcBack?: string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  currentPolicy?: string;
  other?: string;
  policyStatus?: string; //booked
  paymentDetails?: string;
  policyCompletedByName?:string;
  partnerCode?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  payInODPercentage: number;
  payInTPPercentage: number;
  payInODAmount: number;
  payInTPAmount: number;
  payInCommission: number; //payInODAmount+payInTPAmount
  payOutODPercentage: number;
  payOutTPPercentage: number;
  payOutODAmount: number;
  payOutTPAmount: number;
  payOutCommission: number; //payOutTPAmount+payOutODAmount
  paymentUpdatedOn?: any;
  paymentCreatedOn?: any;
  paymentCreatedBy?: any;
  paymentUpdatedBy?: any;
  payInAmount?: number;
  payOutAmount?: number;
  payInPaymentStatus?: string;
  payOutPaymentStatus?: string;
  payInBalance?: number;
  payOutBalance?: number;
  errorMessage?: string;
  bookingTimer?: string;
  leadTimer?: string;
  bookingDate?: string;
  leadDate?: string;
}
export interface IViewPolicy {
  _id?: string;
  policyId?: string;
  policyPaymentId?: string;
  bookingId?: string;
  uuid?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  brokerId: string;
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
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  // documents: any[];
  rcFront?: string;
  rcBack?: string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  currentPolicy?: string;
  other?: string;
  policyStatus?: string; //booked
  paymentDetails?: string;
  partnerCode?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  payInODPercentage: number;
  payInTPPercentage: number;
  payInODAmount: number;
  payInTPAmount: number;
  payInCommission: number; //payInODAmount+payInTPAmount
  payOutODPercentage: number;
  payOutTPPercentage: number;
  payOutODAmount: number;
  payOutTPAmount: number;
  payOutCommission: number; //payOutTPAmount+payOutODAmount
  paymentUpdatedOn?: any;
  paymentCreatedOn?: any;
  paymentCreatedBy?: any;
  paymentUpdatedBy?: any;
  payInAmount?: number;
  payOutAmount?: number;
  payInPaymentStatus?: string;
  payOutPaymentStatus?: string;
  payInBalance?: number;
  payOutBalance?: number;
  errorMessage?: string;
  bookingTimer?: string;
  leadTimer?: string;
  bookingDate?: string;
  leadDate?: string;
}
