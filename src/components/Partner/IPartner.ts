export interface ILeadForm {
  id?: string;
  category: string;
  policyType: string; 
  caseType: string; 
  companyName: string; 
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
  leadCreatedBy: string;
  remarks?: string;
  status: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdOn?: string
  timer?: string
  updatedOn?: string
}

export interface ILead {
  status: string;
  data?: ILeads;
  message?: string;
}

export interface ILeads {
  _id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  companyName: string; //TATA
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
  remarks?: string;
  status?: string;
  isActive?: boolean;
  leadCreatedBy: string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  timer?: string;
  isPolicyPdfUploaded:boolean;
  policyNumber:string;
  policyPdf:string;
}
export interface ILeadsVM {
  id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  companyName: string; //TATA
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
  remarks?: string;
  leadCreatedBy: string;
  status: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  timer?: string;
  isPolicyPdfUploaded:boolean;
  policyNumber:string;
  policyPdf:string;
}

export interface IQuotation {
  status: string;
  data?: IQuotations;
  message?: string;
}
export interface IQuotations {
  id?: string;
  leadId?: string;
  partnerId?: string;
  partnerName?: string;
  //relationshipManagerId?: string;
  //relationshipManagerName?: string;
  quotationImage?: string;
  comments: string; //motor
  status: string;
  isActive?: boolean;
  createdBy?: string;
}
export interface IQuotationForm {
  id?: string;
  leadId?: string;
  partnerId?: string;
  partnerName?: string;
  //relationshipManagerId?: string;
  //relationshipManagerName?: string;
  quotationImage?: string;
  comments: string; //motor
  status: string;
  isActive?: boolean;
  createdBy?: string;
}
export interface IPartnerForm {
  id?: string;
  name?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IPartnersVM {
  id?: string;
  name?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface IPartners {
  _id?: string;
  isActive?: boolean;
  userCode?:string;
  name?:string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IPartner {
  status: string;
  data: IPartners[];
  message: string;
}
