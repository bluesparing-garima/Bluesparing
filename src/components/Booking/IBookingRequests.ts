export interface IBookingRequest {
  status: string;
  data?: IBookingRequest;
  message?: string;
}

export interface IBookingRequests {
  _id?: string;
  uuid?: string;
  leadId?: string;
  policyNumber: string;
  category: string; //motor,non motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  partnerId: string; //
  partnerName: string; //
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  bookingStatus: string; //
  bookingCreatedBy: string; //creating by lgin user
  bookingAcceptedBy: string; //creating by lgin user
  rcFront?: string;
  rcBack?: string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  currentPolicy?: string;
  other?: string;
  timer?: string;
  isActive?: any;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  rejectionReason?:string;
  motorPolicyId?:string;
  isPublished?:string;
  acceptedByName?:string;

}

export interface IBookingRequestsVM {
  id?: string;
  uuid?: string;
  leadId?: string;
  policyNumber: string;
  category: string;
  policyType: string;
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  partnerId: string; //
  partnerName: string; //
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  bookingStatus: string; //
  bookingCreatedBy: string; //creating by lgin user
  bookingAcceptedBy: string; //creating by lgin user
  isActive?: any;
  rcFront?: string;
  rcBack?: string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  timer?: string;
  currentPolicy?: string;
  other?: string;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  isRejected?:boolean;
  rejectionReason?:string;
  acceptedByName?:string;
  motorPolicyId?:string;
  isPublished?:string;
}

export interface IBookingRequestForm {
  id?: string;
  leadId?: string;
  policyNumber: string;
  category: string; //motor,non motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  partnerId: string; //
  partnerName: string; //
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  bookingStatus: string; //
  bookingCreatedBy: string; //creating by lgin user
  bookingAcceptedBy: string; //creating by lgin user
  //  documents: any[];
  rcFront?: string;
  rcBack?: string;
  timer?:string;
  previousPolicy?: string;
  survey?: string;
  puc?: string;
  fitness?: string;
  proposal?: string;
  currentPolicy?: string;
  other?: string;
  isActive?: any;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedBy?: any;
  motorPolicyId?:string;
  isPublished?:string;
}
