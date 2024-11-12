


export const addRoleEndpoint = () => (`/api/roles`);

export const editRoleEndpoint = (roleId: string) =>
  (`/api/roles/${roleId}`);

export const getRoleEndpoint = () => (`/api/roles`);

export const getRoleDetailsEndpoint = (roleId: string) =>
  (`/api/roles/${roleId}`);

export const deleteRoleEndpoint = (roleId: string) =>
  (`/api/roles/${roleId}`);

export const employeeAttendanceEnpoint=(eId:string)=>{
  return(`/api/attendance/stats/employee/${eId}`)
}