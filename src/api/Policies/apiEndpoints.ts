export const getPolicyCountEndpoint =()=> {
return ('/api/policy/motor/remaining-policy-count');
}
export const addPolicyEndpoint = () =>
  (`/api/policy/motor`);
export const editPolicyEndpoint = (policyId: string) =>
  (`/api/policy/motor/${policyId}`);
export const deletePolicyEndpoint = (policyId: string) =>
  (`/api/policy/motor/${policyId}`);
export const archivePolicyEndpoint = (startDate: string, endDate: string) =>
(
  `/api/policy/motor/in-active?startDate=${startDate}&endDate=${endDate}`
);

export const getPolicyEndpoint = (startDate: string, endDate: string) =>
(
  `/api/policy/motor/date-range?startDate=${startDate}&endDate=${endDate}`
);
export const getPolicyByNumberEndpoint = (policyNumber: string) =>
(
  `/api/policy/motor/validatePolicyNumber/?policyNumber=${policyNumber}`
);
export const getPolicyByPartnerEndpoint = (
  partnerId: string,
  startDate: string,
  endDate: string
) =>
(
  `/api/policy/motor/partner/${partnerId}?startDate=${startDate}&endDate=${endDate}`
);
export const getPolicyByIdEndpoint = (policyId: string) =>
  (`/api/policy/motor/policyId/${policyId}`);
export const getPolicyByWithPaymentEndpoint = (policyId: string) =>
  (`/api/policy/motor/payment-details/${policyId}`);
export const getPolicyCompletedByIdEndpoint = (
  policyCompletedById: string,
  startDate: string,
  endDate: string
) =>
(
  `/api/policy/motor/policy-completed-by/${policyCompletedById}?startDate=${startDate}&endDate=${endDate}`
);
export const getVechicleNumberEndpoint = (vehicleNumber: string) =>
(
  `/api/policy/motor/validateVehicleNumber?vehicleNumber=${vehicleNumber}`
);

export const getPolicyDataByPolicyNumber = (policyNumber: string) => {
  return (
    `/api/policy/motor/policy-number/${policyNumber}`
  );
};
export const getPolicyDataByVehicleNumber = (vehicleNumber: string) => {
  return (
    `/api/policy/motor/vehicle-number/${vehicleNumber}`
  );
};
export const getPolicyPDFEndpoint = () => {
  return (`/api/policy/pdf/upload`);
};
export const motorPolicyExcelEndpoint = () =>
  (`/api/policy/motor/upload`);
export const getPolicyByRmIdEndpoint = (startDate: string, endDate: string, rmId: string) =>
(
  `/api/policy/motor/relationship-manager/${rmId}?startDate=${startDate}&endDate=${endDate}`
);
export const getRenewedPolicyEp = (startDate: string, endDate: string, partnerId?: string) => {
  if (partnerId) {
    return `/api/policy/motor/filter/renewed-date-range?startDate=${startDate}&endDate=${endDate}&partnerId=${partnerId}`
  } else {
    return `/api/policy/motor/filter/renewed-date-range?startDate=${startDate}&endDate=${endDate}`
  }
}

export const addRemarkPolicyEndpoint = () =>
  (`/api/policy/motor/update-policy-remarks`);

export const addDisputeMsgEp =()=>{
  return `/api/policy-dispute`
}


export const updatePublishedEp = ()=>{
  return '/api/policy/motor/update-is-published'
}
export const publishPolicyEp = ()=>{
  return '/api/policy/motor/update-partner-and-published'
}

export const getDisputeMsgEp =(policyId:string)=>{
return `/api/policy-dispute/policyId/${policyId}`
}
export const toggleDisputeEp = ()=>{
return '/api/policy/motor/update-is-dispute'
}
export const getAllDisputedEp = ()=>{
return '/api/policy/motor/all-is-dispute'
}

export const uploadpolicyPdf = () => {
  return (`/api/policy/motor/upload-policy-pdf`);
};