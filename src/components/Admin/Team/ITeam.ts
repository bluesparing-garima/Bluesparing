export interface ITeamForm {
  id?: string;
  branch?: any;
  role: any;
  roleId?: string;
  userCode?: string;
  headRMId?: string;
  headRM?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  originalPassword?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  password?: string;
  pincode?: string;
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
  joiningDate?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  planId?: string;
  planName?: string;
  branchId?: string;
  branchName: string;
  planExpired?: string;
  planStartDate?: string;
  transactionId?: string;
  transactionStatus?: boolean;
}

export interface ITeamsVM {
  id?: string;
  branchName?: string;
  role?: string;
  originalPassword?: string;
  userCode?: string;
  headRMId?: string;
  headRM?: string;
  name?: string;
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
  image?: string;
  profileImage?: string;
  adharCardBack?: string;
  adharCardFront?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  isActive?: boolean;
  joiningDate?: string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  companyLogo?: string;
  forceUpdate?: number;
  partnerCode?: string;
  planName?: string;
  transactionStatus?: boolean;
  planId?: string;
  planExpired?: string;
  planStartDate?: string;
  transactionId?: string;
  wallet?: number;
  accounts?: string[];
  policyCount?: number; // Added policyCount
  userLimit?: { [key: string]: number }; // Added userLimit
}

export interface ITeams {
  _id?: string;
  branchName?: string;
  role?: string;
  originalPassword?: string;
  userCode?: string;
  headRMId?: string;
  headRM?: string;
  name?: string;
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
  profileImage?: string;
  adharCardBack?: string;
  adharCardFront?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  isActive?: boolean;
  joiningDate?: string;
  createdBy?: string;
  createdOn?: string;
  companyLogo?: string;
  updatedOn?: string;
  updatedBy?: string;
  planName?: string;
  partnerCode?: string;
  transactionStatus?: boolean;
}

export interface IAppUser {
  _id: string;
  name: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: string;
  parentAdminId?: string;
  password?: string;
  phoneNumber?: number;
  role?: string;
  roleId?: string;
  profileId?: string;
  userCode?: string;
  branchId?: string;
  branchName?: string;
  address?: string;
  pincode?: string;
  profileImage?: string;
  companyLogo?: string;
  image?: string;
  adharCardFront?: string;
  adharCardBack?: string;
  panCard?: string;
  qualification?: string;
  bankProof?: string;
  experience?: string;
  other?: string;
  headRMId?: string;
  headRM?: string;
  planName?: string;
  planId?: string;
  accounts?: string[];
  salary?: number;
  joiningDate?: Date;
  transactionStatus?: boolean;
  transactionId?: string;
  originalPassword?: string;
  wallet?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string | null;
  createdOn?: Date;
  updatedOn?: Date | null;
}

export interface ITeam {
  status: string;
  data: IAppUser;
  message: string;
}
