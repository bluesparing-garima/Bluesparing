

export const addCaseTypeEndpoint = () => (`/api/case-type`);

export const editCaseTypeEndpoint = (caseTypeId: string) =>
  (`/api/case-type/${caseTypeId}`);

export const getCaseTypeEndpoint = () => (`/api/case-type`);

export const getCaseTypeDetailsEndpoint = (caseTypeId: string) =>
  (`/api/case-type/${caseTypeId}`);

export const deleteCaseTypeEndpoint = (caseTypeId: string) =>
  (`/api/case-type/${caseTypeId}`);
