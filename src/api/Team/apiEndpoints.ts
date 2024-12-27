import { SafeKaroUser } from "../../context/constant";
let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
export const addTeamEndpoint = () =>
(`/api/user-profile`);
export const getRMListEndpoint = (role: string) =>
(`/api/user-profile/byRole/${UserData.parentAdminId}?role=${role}`);

export const editTeamEndpoint = (teamId: string) =>
(`/api/user-profile/${teamId}/${UserData.parentAdminId}`);

export const getTeamEndpoint = () =>
(`/api/user-profile/${UserData.parentAdminId}`);
export const getEmployeeEndpoint = () =>
(`/api/user-profile/exclude-partner/${UserData.parentAdminId}`);

export const getTeamDetailsEndpoint = (teamId: string) =>
(`/api/user-profile/${teamId}`);

export const deleteTeamEndpoint = (teamId: string) =>
(`/api/user-profile/${teamId}/${UserData.parentAdminId}`);

export const validateEmailEndpoint = (emailId: string) =>
(`/api/user-profile/check-email?email=${emailId}`);
export const getTeamByRmEndpoint = (remId: string) =>
(`/api/user-profile/headRMId/${UserData.parentAdminId}?headRMId=${remId}`);
