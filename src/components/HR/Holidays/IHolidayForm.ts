export interface IHolidayForm {
  id: string;
  name: string;
  date: string | null;
  day?: string; 
  createdBy?: string;
}
export interface Holiday {
  _id: string;
  name: string;
  date: string;
  day: string;
}
export interface HolidayLocationState {
  holiday: Holiday; 
}
