
export const getFilterPoliciesEndpoint = (
  fuelType: string,
  policyType: string,
  companyName: string,
  productType: string,
  subCategory: string,
  cc: number,
  weight: number,
  ncb: string,
  rto: string,
  broker: string,
  seatingCapacity: number,
  //insuredType: string,
  caseType: string,
  make: string,
  model: string,
  vehicleAge: string
) =>
 (
    `/api/policy/motor/filter/policies?fuelType=${fuelType}&productType=${productType}&subCategory=${subCategory}
    &cc=${cc}&weight=${weight}&ncb=${ncb}&policyType=${policyType}&rto=${rto}&caseType=${caseType}
    &companyName=${companyName}&make=${make}&model=${model}&vehicleAge=${vehicleAge}&broker=${broker}&seatingCapacity=${seatingCapacity}`
  );
export const getFilterPoliciesByDateEndpoint = (
  startDate: string,
  endDate: string
) =>
 (
    `/api/policy/motor/filter/date-range?startDate=${startDate}&endDate=${endDate}`
  );
export const updatePayInPayOutDateRangeEndpoint = () =>
 (`/api/policy/motor/filter/calculate-commission`);
