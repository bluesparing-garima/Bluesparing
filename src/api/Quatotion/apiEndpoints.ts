export const addQuotationEndpoint = () =>
  (`/api/lead-quotation`);

export const getQuotationByLeadIdEndpoint = (leadId: string) =>
  (`/api/lead-quotation/leadId?leadId=${leadId}`);
