export interface IDashboards {
  status: string;
  data: IData[];
  message?: string;
}
export interface Policy {
  "Policy Counts"?: number;
  "Net Premium"?: number;
  "Final Premium"?: number;
  Total?: number;
  "PayIn Amount"?: number;
  "Paid Amount"?: number;
  "UnPaid Amount"?: number;
  "PayOut Amount"?: number;
  Revenue?: number;
  "Left Distributed Amount"?: number;
}
export interface IData {
  roleCounts: IRoleCounts;
  //policyCounts: IPolicyCounts;
  categories: Record<string, Policy>;
  premiums: IPremiums;
  monthlyHolidays?:any;
  commissions: ICommissions;
  bookingRequests: IBookingRequests;
  leadCounts: ILeadRequests;
  adminCounts: IAdminCounts;
  // accounts: Account[];
  accounts: Record<string, Account>; // Object with dynamic account keys
  totalAmount: number;
  totalAccounts: number;
}
export interface ITransactions {
  Credit: number;
  Debit: number;
}
export interface IAccountData {
  policyCounts: IPolicyCounts;
  premiums: IPremiums;
  commissions: ICommissions;
  monthlyHolidays?:any;
  totalAccounts: number;
  totalAmount: number;
  transactions: ITransactions;
  accounts: Account[];
}
export interface Account {
  accountCode?: string;
  accountId?: string;
  accountNumber?: string;
  amount: number;
  credit: number;
  debit: number;
}
export interface IPartnerDashboard {
  status: string;
  data: IPartnerData[];
  message?: string;
}
export interface IBookingDashboard {
  status: string;
  data: IBookingData[];
  message?: string;
}
export interface IAccountDashboard {
  status: string;
  data: IAccountData[];
  message?: string;
}
export interface IPartnerData {
  policyCounts: IPolicyCounts;
  premiums: IPremiums;
  commissions: ICommissions;
  bookingRequests: IBookingRequests;
  leadCounts: ILeadRequests;
}
export interface IBookingData {
  policyCounts: IPolicyCounts;
  premiums: IPremiums;
  monthlyHolidays?:any;
  bookingRequests: IBookingRequests;
}

export interface IRoleCounts {
  Operation: number;
  Booking: number;
  Partner: number;
  "Relationship Manager": number;
  Total: number;
  Account: number;
}

export interface IPolicyCounts {
  motor: number;
}

export interface IPremiums {
  "Net Premium": number;
  "Final Premium": number;
}

export interface ICommissions {
  "Monthly Commission"?: number;
  "Total Commission"?: number;
  "Total UnPaid Amount"?: number;
  "Total Paid Amount"?: number;
  "Monthly Paid Amount"?: number;
  "Monthly UnPaid Amount"?: number;
  "PayIn Commission": number;
  "PayOut Commission": number;
  "Broker Amount": number;
  "Broker Balance": number;
  Balance?: number;
}

export interface IBookingRequests {
  "Total Booking": number;
  "Accepted Booking": number;
  "Booked Booking": number;
  "Requested Booking": number;
  "Rejected Booking"?: number;
}

export interface ILeadRequests {
  "Total Lead": number;
  "Requested Lead": number;
  "Accepted Lead": number;
  "Payment Pending": number;
  "Booked Lead": number;
}
export interface IAdminCounts {
  Brokers: number;
  Makes: number;
  Models: number;
  Categories: number;
  Companies: number;
  "Product Types": number;
  "SubProduct Types": number;
}

export interface IOperationDashboard {
  status: string;
  data: IOperationData[];
  message?: string;
}

export interface IOperationData {
  bookingRequests: IBookingRequests;
  leadCounts: ILeadRequests;
}
