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

export const getTeamDetailsEndpoint = (teamId: string,parentAdminId?:string) =>{
    let id  = UserData?.parentAdminId;
    if(!id){
        id= parentAdminId;
    }
    return (`/api/user-profile/${teamId}/${id}`);
}


export const deleteTeamEndpoint = (teamId: string) =>
(`/api/user-profile/${teamId}/${UserData.parentAdminId}`);

export const validateEmailEndpoint = (emailId: string) =>
(`/api/user-profile/check-email/?email=${emailId}/${UserData.parentAdminId}`);
export const getTeamByRmEndpoint = (remId: string) =>
(`/api/user-profile/headRMId/${UserData.parentAdminId}?headRMId=${remId}`);
