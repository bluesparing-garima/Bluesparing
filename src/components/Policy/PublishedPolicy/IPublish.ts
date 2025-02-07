export interface PublishedPolicyPageProps {
    partnerName: string;
    partnerId: string;
    policyId: string;
    policyNumber:string;
    bookingId:string;
    leadId?:string;
    bookingCreated?:string;
  }
 export  interface PartnerDetails {
    partnerName: string;
    partnerId: string;
  }

  export interface PublishPolicyFromProps{
   partners:PartnerDetails[];
   policyNumber:string;
   bookingId:string;
   leadId?:string;
   bookingCreated?:string;
  }