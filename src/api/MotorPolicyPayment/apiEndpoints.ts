export const editPolicyPaymentEndpoint = (policyId: string) =>
  (`/api/policy/motor/payment/${policyId}`);

export const getPolicyByWithPaymentEndpoint = (policyId: string) =>
  (`/api/policy/motor/${policyId}`);
