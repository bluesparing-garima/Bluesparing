export interface ITeamForm {
  id?: string;
  branchName?: string;
  role: any;
  roleId?:string;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  originalPassword?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  password?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  salary?: number;
  image?: string;
  adharCardBack?: string;
  adharCardFront?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  //document?: any[];
  joiningDate?:string,
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  planId?:string;
  planName?:string;
}

export interface ITeamsVM {
  id?: string;
  branchName?: string;
  role?: string;
  originalPassword?: string;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  password?: string;
  salary?: number;
  image?:string;
  //document?: any[];
  profileImage?: string;
  adharCardBack?: string;
  adharCardFront?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  isActive?: boolean;
  joiningDate?:string,
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  companyLogo?:string;
  forceUpdate?: number;
  planName?:string;
  transactionStatus?:boolean;
}
export interface ITeams {
  _id?: string;
  branchName?: string;
  role?: string;
  originalPassword?: string;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  password?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  salary?: number;
  // document?: any[];
  image?: string;
  profileImage?:string;
  adharCardBack?: string;
  adharCardFront?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  isActive?: boolean;
  joiningDate?:string,
  createdBy?: string;
  createdOn?: string;
  companyLogo?:string;
  updatedOn?: string;
  updatedBy?: string;
  planName?:string;
  transactionStatus?:boolean;
}

export interface ITeam {
  status: string;
  data: ITeams;
  message: string;
}
