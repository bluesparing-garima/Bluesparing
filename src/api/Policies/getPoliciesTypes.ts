import { Header } from "../../Auth/IAuth";
export interface GetMotorPoliciesPDFProps {
  header: Header;
  file: any;
}
export interface DeletePolicyProps {
  header: Header;
  policyId: any;
  policies: any;
}
export interface AddPolicyProps {
  header: Header;
  policy: any;
  onProgress: ((progress: number) => void) | undefined;
}
export interface EditPolicyProps {
  header: Header;
  policy: any;
  policyId: string;
}
export interface AddPolicyRemarks {
  policyRemarks: string;
  policyId: string;
}
export interface EditPolicyPublishStatus {
  header: Header;
  policyNumber: string;
  isPublished: boolean;
}
export interface GetMotorPoliciesProps {
  header?: Header;
  startDate?: string;
  endDate?: string;
  rmId?: string;
}
export interface GetPolicyByNumberProps {
  header?: Header;
  policyNumber: string;
}
export interface GetVechicleNumberProps {
  header?: Header;
  vehicleNumber: string;
}

export interface GetPolicyByIdProps {
  header?: Header;
  policyId: string;
}
export interface GetPolicyCompletedByIdProps {
  header?: Header;
  policyCompletedById: string;
  startDate?: string;
  endDate?: string;
}
export interface GetPolicyByPartnerIdProps {
  header?: Header;
  partnerId: string;
  startDate?: string;
  endDate?: string;
}
export interface GetMotorPolicyExcelProps {
  header?: Header;
  excel: any;
}
export interface GetRenewedMotorPoliciesProps {
  header?: Header;
  startDate: string;
  endDate: string;
  partnerId?: string;
}
export interface EditPublishPartnerProps {
  isPublished: boolean;
  partnerId: string;
  partnerName: string;
  policyNumber: string;
}
export interface UpdateDisputeProps{
  policyNumber:string;
  isDispute:boolean;
}