export interface ISubscription {
    _id: string;
    planName: string;
    monthlyAmount: number;
    policyCount: number;
    userLimit: Record<string, number|string>;
    discount: Record<string, number>
    assignedMenu?: string[];
    assignedAccountMenu?:string[];
    assignedAdminMenu?:string[];
    assignedBookingMenu?:string[];
    assignedHRMenu?:string[];
    assignedOperationMenu?:string[];
    assignedPartnerMenu?:string[];
    assignedRMMenu?:string[];
    createdBy: string;
    planDetails?:any;
    updatedBy: string;
    createdOn: string;
    updatedOn: string;
    isActive: boolean;
}
 