export interface GetFilterPoliciesTypeProps {
  header?: any;
  fuelType?: string;
  policyType?: string;
  companyName?: string;
  productType?: string;
  subCategory?: string;
  cc?: number | null;
  weight?: number | null;
  broker: string;
  seatingCapacity?: number | null;
  ncb?: string;
  rto?: string;
  // insuredType?: string;
  caseType?: string;
  make?: string;
  model?: string;
  vehicleAge: string;
}

export interface GetFilterPoliciesByDateTypeProps {
  header?: any;
  startDate?: string;
  endDate?: string;
}
export interface UpdatePayInPayOutDateRangeProps {
  header?: any;
  data?:any;
}
