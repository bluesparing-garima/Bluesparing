export const holidaysAddEndpoint = () => {
    return ("/api/holiday-calendar")
}
export const holidaysYearEndpoint = () => {
    return ("/api/holiday-calendar")
}
export const holidaysDateFilterEndpoint = (startDate: string, endDate: string) => {
    return (`/api/holiday-calendar/date-range?startDate=${startDate}&endDate=${endDate}`)
}
export const holidayEditEndpoint = (id: string) => {
    return (`/api/holiday-calendar/${id}`)
}
export const holidayDeleteEndpoint = (id: string) => {
    return (`/api/holiday-calendar/${id}`)
}
export const attendancePostEndpoint = (id?: string) => {
    if (id) {
        return `/api/attendance/${id}`
    } else {
        return "/api/attendance";
    }
}
export const attendanceGetAllEndpoint = () => {
    return "/api/attendance";
}
export const attendanceGetByIdEndpoint = (id: string) => {
    return `/api/attendance/${id}`;
}
export const attendanceGetByEmployeeIdEndpoint = (employeeId: string) => {
    return `/api/attendance/employee/${employeeId}`;
}
export const attendanceUpdateEndpoint = (id: string) => {
    return `/api/attendance/${id}`;
}
export const attendanceDeleteEndpoint = (id: string) => {
    return `/api/attendance/${id}`;
}
export const attendanceGetDepartmentEndpoint = () => {
    return `/api/attendance/roles`;
}
export const attendanceTodayByEid = (d: string, eId: string) => {
    return `/api/attendance/employee?today=${d}&employeeId=${eId}`;
}
export const attendanceGetDashboardEndpoint = () => {
    return `/api/attendance/stats`;
}
export const HrDashBoardEndpoint = (sd: string, ed: string, hrId: string) => {
    return (`/api/hr-dashboard?startDate=${sd}&endDate=${ed}&hrId=${hrId}`)
}
export const dateFilerAttendanceEndPoint = (st: string, et: string, eid: string) => {
    return (`/api/attendance/employee/date-range?startDate=${st}&endDate=${et}&employeeId=${eid}`);
}