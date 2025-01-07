import { ISubscription } from "../api/Subscriptions/subscriptionType";

export type Header = {
  "Content-Type": string;
  "Access-Token": string;
  "Id-Token": string;
  "Refresh-Token": string;
};

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  role: string;
  roleId?: string;
  profileId?: string;
  password: string;
  phoneNumber: string;
  confirmPassword?: string;
  partnerCode?: string;
  file?: any;
  joiningDate: string;
  planName: string;
  planId: string;
  companyLogo?:any;
  profileImage?:any;
  gender:string;
  isActive?:boolean;
}
export type FormProps = Omit<ISignUp, "planName" | "planId"> & {
  plans: ISubscription;
};;

export interface IloginRes {
  status: string;
  message: string;
  token: string;
  name: string;
  email: string;
  role: string;
  partnerId: string;
  partnerCode: string;
  phoneNumber: number;
  id: string;
  refreshtoken?: string;
}

export interface IUser {
  name: string;
  email: string;
  _id: string;
  phone: string;
  planName?:string;
  planId?:string;
  planType?:string;
  role?:string;
}