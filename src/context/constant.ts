export const ADD = "add";
export const UPDATE = "update";
export const DATE_TIME_FORMAT = "MMM dd, yyyy, hh:mm a";
export const DATE_FORMAT = "MMM dd, yyyy";
export const DAYJS_FORMAT = "YYYY-MM-DD HH:mm";
export const DAY_FORMAT = "YYYY-MM-DD";
export const DAYS_DB_DISPLAY_FORMAT_DATE_TYPE = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
export const DAYJS_DISPLAY_FORMAT_TABLES = "MMM DD, YYYY";
export const DAYJS_DISPLAY_FORMAT = "MMM DD YYYY";
export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];
export const ALLOWED_BLOG_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const imagePath = "https://api.safekaro.com/uploads/";
export type SafeKaroContextType = {
  user: SafeKaroUser;
  header: Header;
};
export interface Document {
  docName: string;
  file: string;
}
export const header: any = {
  "Content-Type": "application/json",
  "Access-Token": "",
  "Id-Token": "",
  "Refresh-Token": "",
};
export const headerForm: any = {
  "Content-Type": "application/json",
  "Access-Token": "",
  "Id-Token": "",
  "Refresh-Token": "",
};
export type SafeKaroUser = {
  isLoggedIn: boolean;
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId: string; 
  headRMId: string;
  headRM: string; 
  accessToken?: string;
  idToken: string;
  partnerCode: string;
  refreshToken?: string;
};
export type Header = {
  "Content-Type": string;
  "Access-Token": string;
  "Id-Token": string;
  "Refresh-Token": string;
};
export const policyStatusPartner = [
  { label: "Changes Required", value: "Changes Required" },
  { label: "Payment Request", value: "Payment Request" },
];
export const policyStatusOperation = [
  { label: "Doc Pending", value: "Doc Pending" },
  { label: "Quotation Sent", value: "Quotation Sent" },
  { label: "Payment Link Sent", value: "Payment Pending" },
  { label: "Payment Verified", value: "Payment Verified" },
];
export const ROLE_STORAGE_KEY = "paginationRole";
export const MOTOR_POLICY_STORAGE_KEY = "paginationGetPolicy";
export const TEAM_STORAGE_KEY = "paginationTeam";
export const BROKER_STORAGE_KEY = "paginationBroker";
export const BRANCH_STORAGE_KEY = "paginationBranch";
export const CATEGORY_STORAGE_KEY = "paginationCategory";
export const BLOG_CATEGORY_STORAGE_KEY = "paginationBlogCategory";
export const NEWS_CATEGORY_STORAGE_KEY = "paginationNewsCategory";
export const BLOG_STORAGE_KEY = "paginationBlog";
export const News_STORAGE_KEY = "paginationNews";
export const PRODUCT_SUBTYPE_STORAGE_KEY = "paginationProductSubtype";
export const PRODUCT_STORAGE_KEY = "paginationProduct";
export const COMPANY_STORAGE_KEY = "paginationCompany";
export const CASE_TYPE_STORAGE_KEY = "paginationCaseType";
export const POLICY_TYPE_STORAGE_KEY = "paginationPolicyType";
export const FUEL_TYPE_STORAGE_KEY = "paginationFuelType";
export const MAKE_STORAGE_KEY = "paginationMake";
export const MODEL_STORAGE_KEY = "paginationModel";
