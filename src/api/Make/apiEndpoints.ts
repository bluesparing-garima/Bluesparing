
export const addMakeEndpoint = () =>(`/api/make`);

export const editMakeEndpoint = (makeId: string) =>
 (`/api/make/${makeId}`);

export const getMakeEndpoint = () =>(`/api/make`);

export const getMakeDetailsEndpoint = (makeId: string) =>
 (`/api/make/${makeId}`);

export const deleteMakeEndpoint = (makeId: string) =>
 (`/api/make/${makeId}`);

export const validateMakeEndpoint = (makeName: string) =>
 (`/api/make/validate-make/${makeName}`);
