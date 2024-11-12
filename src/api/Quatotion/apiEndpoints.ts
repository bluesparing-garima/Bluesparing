export const addQuotationEndpoint = () =>
  (`/api/lead-quotation`);

export const getQuotationByleadIdEndpoint = (leadId: string) =>
  (`/api/lead-quotation/leadId?leadId=${leadId}`);
