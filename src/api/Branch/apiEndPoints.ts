export const addBranchEndpoint = () => (`/api/branches`);

export const editBranchEndpoint = (branchId: string) =>
  (`/api/branches/${branchId}`);

export const getBranchEndpoint = () => (`/api/branches`);

export const getBranchDetailsEndpoint = (branchId: string) =>
  (`/api/branches/${branchId}`);

export const deleteBranchEndpoint = (branchId: string) =>
  (`/api/branches/${branchId}`);