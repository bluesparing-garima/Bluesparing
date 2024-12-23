export interface ITransaction {
    _id?: string;
    planId: string;
    orderId: string;
    userId: string;
    transactionId: string;
    planType: string;
    planStartDate?: string;
    planEndDate?: string;
    transactionStatus: string;
    isActive: boolean;
    createdBy: string;
    updatedBy?: string | null;
    createdOn?: string;
    updatedOn?: string;
    planName?: string;
    monthlyAmount?: number;
    annualAmount?: number;
    planDetails?: string;
    policyCount?: number;
    users?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    joiningDate?: string;
  }

