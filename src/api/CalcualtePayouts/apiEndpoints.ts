
export const getCalculatePayInEndpoint = (
  fuelType: string,
  policyType: string,
  companyName: string,
  productType: string,
  subCategory: string,
  engine: number,
  weight: number,
  ncb: string,
  rto: string,
  //insuredType: string,
  caseType: string,
  make: string,
  model: string,
  vehicleAge: string
) =>
(
    `/api/calculate/pay-in?fuelType=${fuelType}&productType=${productType}&subCategory=${subCategory}
    &engine=${engine}&weight=${weight}&ncb=${ncb}&policyType=${policyType}&rto=${rto}&caseType=${caseType}
    &companyName=${companyName}&make=${make}&model=${model}&vehicleAge=${vehicleAge}`
  );

export const getCalculatePayOutEndpoint = (
  fuelType: string,
  policyType: string,
  companyName: string,
  productType: string,
  subCategory: string,
  engine: number,
  weight: number,
  ncb: string,
  rto: string,
  //insuredType: string,
  caseType: string,
  make: string,
  model: string,
  vehicleAge: string
) =>
(
    `/api/calculate/pay-out?fuelType=${fuelType}&productType=${productType}&subCategory=${subCategory}&engine=${engine}&weight=${weight}&ncb=${ncb}&policyType=${policyType}&rto=${rto}&caseType=${caseType}&companyName=${companyName}&make=${make}&model=${model}&vehicleAge=${vehicleAge}`
  );
