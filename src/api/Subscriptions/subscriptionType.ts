export interface ISubscription {
    _id: string;
    planName: string;
    monthlyAmount: number;
    annualAmount: number;
    policyCount: number;
    users: string;
    assignedMenu: string[];
    createdBy: string;
    updatedBy: string;
    createdOn: string;
    updatedOn: string;
    isActive: boolean;
}


