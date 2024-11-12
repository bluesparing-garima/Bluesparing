export interface IAddHolidays {
    date?: string;
    name?: string
}
export interface IAddHolidayPayload {
    header: any,
    holidayData: IAddHolidays
    id?: string
}
export interface IGetHolidaysPayload {
    header?: any;
    startDate?: string;
    endDate?: string;
}
export interface IDeleteHolidaysPayload {
    header?: any;
    id: string
}
//attendance
export interface IGetAttendanceByEIdProps {
    header?: any;
    employeeId: string
}
export interface IAddAttendanceProps {
    employeeName: string;
    attendanceType?: string;
    inTime?: string |null;
    outTime?: string |null;
    totalHours?: string|null;
    employeeId: string;
    remarks?:string;
    _id?:string
}

export interface IAddAttendancePayload {
    header: any,
    attendanceData: IAddAttendanceProps
    id?: string
}
export interface IGetRequestProps{
    header:any;
}
export interface IGetHrDashboard{
    header:any;
    startDate:string;
    endDate:string;
    hrId:string;

}

export interface IGetToadyAttendanceProps{
    header:any;
    d:string;
    eId:string
}
export interface IGetAttendanceByDate{
    header:any;
    startDate:string;
    endDate:string;
    emId:string;

}