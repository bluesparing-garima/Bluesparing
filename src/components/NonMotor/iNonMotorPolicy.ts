export interface IAddEditNonMotorPolicyForm {
  id?: string;
  // Common Fields
  policyNumber: string;
  policyType: string; // e.g., "Fire", "Marine", "Miscellaneous"
  caseType: string;
  occupancy: string;
  broker: string;
  partner: string;
  companyName: string;
  issueDate: Date;
  endDate: Date;
  totalSumInsured: number;
  netPremium: number;
  finalPremium: number;
  fullName: string;
  emailId: string;
  phoneNumber: string;
  pinCode: string;
  paymentMode: string;
  paymentDetails: string;

  // Fire Policy Specific Fields
  productType?: string;
  terrorismCover?: boolean;
  terrorismPremium?: number;
  firePremium?: number;
  burglaryPolicy?: BurglaryPolicy;

  // Marine Policy Specific Fields
  marineProduct?: string;
  subCategory?: string;
  commodity?: string;
  annualTurnover?: number;
  accidentalCharge?: number;
  accidentAmount?: number;

  // Miscellaneous Policy Specific Fields
  miscellaneousProductType?: string;
  product?: string;
  limitOfLiability?: number;

  // Metadata
  createdBy: string;
  updatedBy?: string;
  createdOn: Date;
  updatedOn: Date;
  isActive: boolean;
}

export interface BurglaryPolicy {
  hasBurglaryPolicy: boolean;
  policyNumber?: string;
  firstLossBasis?: {
    isFirstLossBasis: boolean;
    sumInsuredAmount?: number;
  };
}