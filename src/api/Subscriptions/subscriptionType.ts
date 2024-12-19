export interface ISubscription {
    _id: string;
    planName: string;
    monthlyAmount: number;
    annualAmount: number;
    policyCount: number;
    users: string;
    assignedMenu?: string[];
    assignedAccountMenu?:string[];
    assignedAdminMenu?:string[];
    assignedBookingMenu?:string[];
    assignedHRMenu?:string[];
    assignedOperationMenu?:string[];
    assignedPartnerMenu?:string[];
    assignedRMMenu?:string[];
    planDetails?:any;
    createdBy: string;
    updatedBy: string;
    createdOn: string;
    updatedOn: string;
    isActive: boolean;
}


