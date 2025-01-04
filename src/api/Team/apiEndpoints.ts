
export const addTeamEndpoint = () =>
    (`/api/user-profile`);
export const getRMListEndpoint = (role: string) =>
    (`/api/user-profile/byRole?role=${role}`);

export const editTeamEndpoint = (teamId: string) =>
    (`/api/user-profile/${teamId}`);

export const getTeamEndpoint = () =>
    (`/api/user-profile`);
export const getEmployeeEndpoint = () =>
    (`/api/user-profile/exclude-partner`);

export const getTeamDetailsEndpoint = (teamId: string) => {

    return (`/api/user-profile/${teamId}`);
}


export const deleteTeamEndpoint = (teamId: string) =>
    (`/api/user-profile/${teamId}`);

export const validateEmailEndpoint = (emailId: string) =>
    (`/api/user-profile/check-email/?email=${emailId}`);
export const getTeamByRmEndpoint = (remId: string) =>
    (`/api/user-profile/headRMId/headRMId=${remId}`);
