export const ADD = "add";
export const UPDATE = "update";
export const DATE_TIME_FORMAT = "MMM dd, yyyy, hh:mm a";
export const DATE_FORMAT = "MMM dd, yyyy";
export const DAYJS_FORMAT = "YYYY-MM-DD HH:mm";
export const DAY_FORMAT = "YYYY-MM-DD";
export const DAYS_DB_DISPLAY_FORMAT_DATE_TYPE = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
export const DAYJS_DISPLAY_FORMAT_TABLES = "MMM DD, YYYY";
export const DAYJS_DISPLAY_FORMAT = "MMM DD YYYY";
export const MAX_FILE_SIZE = 7 * 1024 * 1024;

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

export const ALLOWED_BLOG_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

// export const imagePath = "https://iimapi.bluesparing.com/uploads/";
export const imagePath = "http://localhost:7000/uploads/";

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
  isFreePlanUsed: boolean;
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: string;
  profileId: string;
  headRMId: string;
  headRM: string;
  accessToken?: string;
  idToken: string;
  partnerCode: string;
  refreshToken?: string;
  companyLogo?: any;
  planName?: string;
  planId?: string;
  roleId?: string;
  policyCount?: number;
  transactionStatus?: boolean;
  planExpired?: string;
  planStartDate?: string;
  profileImage?: string;
  transactionId?: string;
};
export type Header = {
  "Content-Type": string;
  "Access-Token": string;
  "Id-Token": string;
  "Refresh-Token": string;
};
export const policyStatusPartner = [
  { label: "Required Changes ", value: "Required Changes" },
  { label: "Required Payment Link", value: "Required Payment Link" },
  { label: "Resend Link", value: "Resend Link" },
  { label: "Payment Done", value: "Payment Done" },
  { label: "Policy PDF", value: "Policy Pdf" },
];
export const policyStatusOperation = [
  { label: "Documents Pending", value: "Documents Pending" },
  { label: "Quotation Sent", value: "Quotation Sent" },
  { label: "Payment Link Sent", value: "Payment Pending" },
  { label: "Link Resend", value: "Payment Pending" },
  { label: "Payment Verified", value: "Payment Verified" },
  { label: "Shared Policy"  , value: "Shared Policy" },
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
export const SESSION_USER = "session_user";
export const CURRENT_SUBSID = 'currentSubscriptionIds'
export const CURRENT_ROLE_MENUS = 'currentRoleMenu'
export const addLeadDocumentsOptions = [
  { label: "RC Front", value: "rcFront" },
  { label: "RC Back", value: "rcBack" },
  { label: "Survey", value: "survey" },
  { label: "Fitness", value: "fitness" },
  { label: "Proposal", value: "proposal" },
  { label: "Previous Policy", value: "previousPolicy" },
  { label: "Current Policy", value: "currentPolicy"},
  { label: "Quotation", value: "quotation" },
  { label: "Front Adhar", value: "frontAdhar" },
  { label: "Back Adhar", value: "backAdhar" },
  { label: "Pan Card", value: "panCard" },
];


export const addPolicyDocumentsOptions = [
  { label: "RC Front", value: "rcFront" },
  { label: "RC Back", value: "rcBack" },
  { label: "Previous Policy", value: "previousPolicy" },
  { label: "Current Policy", value: "currentPolicy" },
  { label: "Pan Card", value: "panCard" },
  { label: "Adhar Card", value: "adharCard" },
  { label: "Survey", value: "survey" },
  { label: "GST", value: "gst" },
  { label: "Other", value: "Other" },
];

export const addBookingReqDocumentsOptions = [
  { label: "RC Front", value: "rcFront" },
  { label: "RC Back", value: "rcBack" },
  { label: "Previous Policy", value: "previousPolicy" },
  { label: "Current Policy", value: "currentPolicy" },
  { label: "Pan Card", value: "panCard" },
  { label: "Adhar Card", value: "adharCard" },
  { label: "Survey", value: "survey" },
  { label: "GST", value: "gst" },
  { label: "Other", value: "Other" },
];

export const RmLinkMapper: Record<string, string> = {
  "total policy count": "/rm/rm_polices",
  "total net premium": "/netpremium",
  "total final premium": "/finalpremium",
  "total revenue": "",
  "monthly policy count": "/rm/rm_polices",
  "monthly net premium": "/netpremium/monthly_preminum",
  "monthly final premium": "/finalpremium/monthly",
  "monthly revenue": "",
  "total payin amount": "/payins",
  "total received payin amount": "/payins/recieved",
  "total payin balance": "/payins/balance",
  "total left dist.": "/payins/leftDistributed",
  "monthly payin": "/payins/monthly",
  "monthly received payin": "/payins/recieved/monthly",
  "monthly payin balance": "/payins/balance/monthly",
  "monthly payin left dist.": "/payins/leftDistributed/monthly",
  "total payout amount": "/payouts",
  "total paid payout amount": "/payouts/paid",
  "total payout balance": "/payouts/balance",
  "total payout left dist.": "/payouts/leftDistributed",
  "monthly payout amount": "/payouts/monthly",
  "monthly paid payout amount": "/payouts/monthly/paid",
  "monthly payout balance": "/payouts/monthly/balance",
  "monthly payout left dist.": "/payouts/monthly/leftDistributed",
};


