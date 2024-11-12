;


export const addCompanyEndpoint = () => (`/api/company`);

export const editCompanyEndpoint = (companyId: string) =>
(`/api/company/${companyId}`);

export const getCompanyEndpoint = () =>(`/api/company`);

export const getCompanytDetailsEndpoint = (companyId: string) =>
(`/api/company/${companyId}`);

export const deleteCompanyEndpoint = (companyId: string) =>
(`/api/company/${companyId}`);