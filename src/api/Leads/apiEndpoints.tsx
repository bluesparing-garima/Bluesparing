
export const addLeadEndpoint = () =>
 (`/api/lead-generate`);

export const editLeadEndpoint = (leadId: string) =>
 (`/api/lead-generate/${leadId}`);

export const getLeadByIdEndpoint = (leadId: string) =>
 (`/api/lead-generate/${leadId}`);

export const getLeadEndpoint = () =>
 (`/api/lead-generate`);

export const getLeadByPartnerIdEndpoint = (partnerId: string) =>
 (`/api/lead-generate/partner-id/${partnerId}`);

export const getLeadByUserIdEndpoint = (userId: string) =>
 (`/api/lead-generate/created-by/${userId}`);

export const acceptLeadEndpoint = (leadId: string) =>
 (`/api/lead-generate/accepted-lead/${leadId}`);
