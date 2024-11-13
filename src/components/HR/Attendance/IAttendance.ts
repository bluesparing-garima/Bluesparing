export interface IAttendance {
  _id?: string;
  employeeName?: string;
  attendanceType?: string;
  isActive?: boolean;
  createdOn?: string;
  updatedOn?: string;
  employeeId?: string;
  inTime?: string;
  outTime?: string;
  totalHours?: string;
  remarks?: string;
}
export interface IEmployee {
  employeeId: string;
  employeeName: string;
  present: number;
  leave: number;
  halfDay: number;
  todaysAttendance: string;
  profileImage?:string;
  todayInTime?:string;
  todayOutTime?:string
}

export interface AttendanceLocationState {
  attendance: IAttendance;
}
export interface AddAttendanceFormProps {
  initialValues: IAttendance | null;
}
export interface MonthlyAttendanceChartProps {
  monthlyPresent: string;
  monthlyAbsent: string;
  leaveThisMonth: string;
}
export interface IDepartment {
  employees: IEmployee[];
}
export interface IAttendanceData {
  Account: IDepartment;
  Booking: IDepartment;
  HR: IDepartment;
  IT: IDepartment;
  Operation: IDepartment;
  RM: IDepartment;
}