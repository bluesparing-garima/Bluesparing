import SignUp from "./Auth/Signup";
import Dashboard from "./components/Dashboard/dashboard";
import PartnerDashboard from "./components/Dashboard/partnerDashboard";
import BookingDashboard from "./components/Dashboard/bookingDashboard";
import Roles from "./components/Admin/Role/Roles/Roles";
import AddRole from "./components/Admin/Role/AddRole/addRole";
import Products from "./components/Admin/Product/Products/Products";
import AddProduct from "./components/Admin/Product/AddProduct/addProduct";
import AddPolicyType from "./components/Admin/PolicyType/AddPolicyType/AddPolicyType";
import PolicyTypes from "./components/Admin/PolicyType/PolicyTypes/PolicyTypes";
import CaseTypes from "./components/Admin/CaseType/CaseTypes/CaseTypes";
import AddCaseType from "./components/Admin/CaseType/AddCaseType/addCaseType";
import AddMotorPolicy from "./components/Policy/AddPolicy/AddPolicy";
import EditMotorPolicy from "./components/Policy/EditPolicy/EditPolicy";
import Signin from "./Auth/Signin";
import GetMotorPolicies from "./components/Policy/GetMotorPolicies/GetMotorPolicies";
import PayInUploadByExcel from "./components/Admin/Percentage/PayInUploadByExcel/PayInUploadByExcel";
import PayOutUploadByExcel from "./components/Admin/Percentage/PayOutUploadByExcel/payOutUploadByExcel";
import AddProductSubType from "./components/Admin/ProductSubType/AddProductSubType/AddProductSubType";
import ProductSubTypes from "./components/Admin/ProductSubType/ProductSubTypes/ProductSubTypes";
import AddCompany from "./components/Admin/Company/AddCompany/addCompany";
import Companies from "./components/Admin/Company/Companies/Companies";
import Brokers from "./components/Admin/Broker/Brokers/Brokers";
import AddBroker from "./components/Admin/Broker/AddBroker/addBroker";
import AddBranch from "./components/Admin/Branch/AddBranch/addBranch";
import Branches from "./components/Admin/Branch/Branches/Branches";
import Categories from "./components/Admin/Category/Categories/Categories";
import AddCategory from "./components/Admin/Category/AddCategory/AddCategory";
import AddFuelType from "./components/Admin/FuelType/AddFuelType/addFuelType";
import FuelTypes from "./components/Admin/FuelType/FuelTypes/FuelTypes";
import AddMake from "./components/Admin/Make/AddMake/addMake";
import Makes from "./components/Admin/Make/Makes/Makes";
import Models from "./components/Admin/Model/Models/Models";
import AddModel from "./components/Admin/Model/AddModel/addModel";
import ViewPolicy from "./components/Policy/ViewPolicy/ViewPolicy";
import Teams from "./components/Admin/Team/Teams/Teams";
import AddTeam from "./components/Admin/Team/AddTeam/AddTeam";
import Page403 from "./Auth/Page403";
import AddBookingRequest from "./components/Booking/AddBookingRequest/AddBookingRequest";
import BookingRequests from "./components/Booking/BookingRequests/BookingRequests";
import AddLead from "./components/Partner/AddLead/AddLead";
import Leads from "./components/Partner/Leads/leads";
import NewLeads from "./components/Partner/Leads/Newleads";
import EditLead from "./components/Partner/EditLead/editLead";
import AddQuotation from "./components/Partner/Quotation/AddQuotation/AddQuotation";
import ViewQuotation from "./components/Partner/Quotation/ViewQuotation/ViewQuotation";
import NewBookingRequests from "./components/Booking/BookingRequests/NewBookingRequests";
import EditCommission from "./components/Policy/EditCommsion/editCommison";
import AddAccounts from "./components/Account/AddAcoounts/AddAccounts";
import Accounts from "./components/Account/Accounts/Accounts";
import CompareBrokerPayment from "./components/Account/CompareBrokerPayment/compareBrokerPayment";
import CreditDebits from "./components/Account/CreditDebit/CreditDebits/CreditDebits";
import AddCreditDebits from "./components/Account/CreditDebit/AddCreditDebit/AddCreditDebit";
import AccountDashboard from "./components/Dashboard/accountDashboard";
import UpdatePayment from "./components/Account/UpdatePayments/ManageBrokerPayment/ManageBrokerPayment";
import ManagePartnerPayment from "./components/Account/UpdatePayments/ManagePartnerPayment/ManagePartnerPayment";
import ComparePartnerPayment from "./components/Account/ComparePartnerPayment/comparePartnerPayment";
import ViewAccountCreditDebitsDetails from "./components/Account/Accounts/ViewAccountDetails/ViewAccountCreditDebitsDetails";
import ViewCreditDebitByBrokerCard from "./components/Account/CreditDebit/ViewCreditDebitByBroker/ViewCreditDebitByBrokerCard";
import ViewCreditDebitByPartnerCard from "./components/Account/CreditDebit/ViewCreditDebitByPartner/ViewCreditDebitByPartnerCard";
import Percentage from "./components/Admin/Percentage/Percentage/Percentage";
import ManageCards from "./components/Partner/ManageCard/manageCards";
import ViewCardHistory from "./components/Partner/ManageCard/ViewCardHistory";
import PartnerDebit from "./components/Account/UpdatePayments/PartnerDebit/PartnerDebit";
import ViewPolicyDetails from "./components/Policy/ViewPolicy/ViewPolicyDetails";
import OperationDashboard from "./components/Dashboard/operationDashboard";
import BrokerCredit from "./components/Account/UpdatePayments/BrokerCredit/BrokerCredit";
import GetArchiveMotorPolicies from "./components/Policy/GetMotorPolicies/GetArchiveMotorPolicies";
import RejectionPolicies from "./components/Booking/BookingRequests/RejectionPolicies";
import Partners from "./components/Admin/Team/Teams/Partners";
import Operations from "./components/Admin/Team/Teams/Operations";
import RM from "./components/Admin/Team/Teams/RM";
import Bookings from "./components/Admin/Team/Teams/Bookings";
import TeamAccounts from "./components/Admin/Team/Teams/Accounts";
import Filter from "./components/Filter/FilterPolicy/Filter";
import Notification from "./components/Notification/Notification";
import PolicyPDF from "./components/Policy/PolicyPDF/PolicyPDF";
import ProfilePage from "./components/Profile/ProfilePage";
import AcceptedBooking from "./components/Booking/AcceptedBooking/AcceptedBooking";
import UploadPolicy from "./components/Policy/UploadPolicy/UploadPolicy";
import FilterPayOut from "./components/Filter/FilterPayOut/FilterPayOut";
import FilterPayIn from "./components/Filter/FilterPayIn/FilterPayIn";
import MonthlyFilterPayOut from "./components/Filter/FilterPayOut/MonthlyFilterPayOut";
import MonthlyFilterPayIn from "./components/Filter/FilterPayIn/MonthlyFilterPayIn";
import MonthlyCompanyFilterPayOut from "./components/Filter/FilterPayOut/MonthlyCompanyFilterPayOut";
import MonthlyCompanyFilterPayIn from "./components/Filter/FilterPayIn/MonthlyCompanyFilterPayIn";
import CompanyFilterPayIn from "./components/Filter/FilterPayIn/CompanyFilterPayIn";
import CompanyFilterPayOut from "./components/Filter/FilterPayOut/CompanyFilterPayOut";
import ExcelPayIn from "./components/Account/ExcelPayIn&Payout/ExcelPayIn";
import ExcelPayout from "./components/Account/ExcelPayIn&Payout/ExcelPayout";
import RMDashboard from "./components/Dashboard/RMDashboard";
import RMGetMotorPolicies from "./components/Policy/GetMotorPolicies/RMGetMotorPolicies";
import RmTeams from "./components/Admin/Team/Teams/RmTeam";
import RmLead from "./components/Rm/RmLead";
import RmRequestedBooking from "./components/Booking/BookingRequests/RmRequestedBooking";
import MonthlyPayout from "./components/TreeView/PayOut/MonthlyPayout";
import FilterReceivedPayInAmount from "./components/Filter/FilterRecievedPayInAmount/FilterRecievedPayInAmount";
import CompanyFilterReceivedPayIn from "./components/Filter/FilterRecievedPayInAmount/CompanyFilterRecievedPayIn";
import MonthlyFilterReceivedPayIn from "./components/Filter/FilterRecievedPayInAmount/MonthlyFilterRecievedPayIn";
import MonthlyCompanyFilterReceivedPayIn from "./components/Filter/FilterRecievedPayInAmount/MonthlyCompanyFilterRecievedPayIn";
import FilterPayInBalance from "./components/Filter/FilterPayInBalance/FilterPayInBalance";
import CompanyFilterPayInBalance from "./components/Filter/FilterPayInBalance/CompanyFilterPayInBalance";
import MonthlyCompanyFilterPayInBalance from "./components/Filter/FilterPayInBalance/MonthlyCompanyFilterPayInBalance";
import MonthlyFilterPayInBalance from "./components/Filter/FilterPayInBalance/MonthlyFilterPayInBalance";
import FilterPayInLeftDistributed from "./components/Filter/FilterPayInLeftDistributed/FilterPayInLeftDistributed";
import CompanyFilterPayInLeftDistributed from "./components/Filter/FilterPayInLeftDistributed/CompanyFilterPayInLeftDistributed";
import MonthlyCompanyFilterPayInLeftDistributed from "./components/Filter/FilterPayInLeftDistributed/MonthlyCompanyFilterPayInLeftDistributed";
import MonthlyFilterPayInLeftDistributed from "./components/Filter/FilterPayInLeftDistributed/MonthlyFilterPayInLeftDistributed";
import MonthlyPaidFilterPayOut from "./components/Filter/FilterPaidPayOut/MonthlyPaidFilterPayOut";
import MonthlyCompanyPaidFilterPayOut from "./components/Filter/FilterPaidPayOut/MonthlyCompanyPaidFilterPayOut";
import MonthlyFilterPayOutBalance from "./components/Filter/FilterPayOutBalance/MonthlyFilterPayOutBalance";
import MonthlyCompanyFilterPayOutBalance from "./components/Filter/FilterPayOutBalance/MonthlyCompanyFilterPayOutBalance";
import MonthlyFilterPayOutLeftDistributed from "./components/Filter/FilterPayOutLeftDistributed/MonthlyFilterPayOutLeftDistributed";
import MonthlyCompanyFilterPayOutLeftDistributed from "./components/Filter/FilterPayOutLeftDistributed/MonthlyCompanyFilterPayOutLeftDistributed";
import YearlyPayout from "./components/TreeView/PayOut/YearlyPayOut";
import YearlyPayIn from "./components/TreeView/PayIn/YearlyPayIn";
import MonthlyPayIn from "./components/TreeView/PayIn/MonthlyPayIn";
import FilterPaidPayOut from "./components/Filter/FilterPaidPayOut/FilterPaidPayOut";
import FilterPayOutBalance from "./components/Filter/FilterPayOutBalance/FilterPayOutBalance";
import CompanyFilterPayOutBalance from "./components/Filter/FilterPayOutBalance/CompanyFilterPayOutBalance";
import FilterPayOutLeftDistributed from "./components/Filter/FilterPayOutLeftDistributed/FilterPayOutLeftDistributed";
import CompanyFilterPayOutLeftDistributed from "./components/Filter/FilterPayOutLeftDistributed/CompanyFilterPayOutLeftDistributed";
import CompanyFilterPayOutPaid from "./components/Filter/FilterPaidPayOut/CompanyFilterPayOutPaid";
import FilterPartnerMonthlyNetPremium from "./components/Filter/FilterNetPerminum/FilterPartnerMonthlyNetPremium";
import MonthlyFinalPremium from "./components/Filter/FilterFinalPreminum/MonthlyFinalPremium";
import FilterMonthlyBrokerFinalPremium from "./components/Filter/FilterFinalPreminum/FilterMonthlyBrokerFinalPremium";
import FilterPartnerMonthlyFinalPremium from "./components/Filter/FilterFinalPreminum/FilterPartnerMonthlyFinalPremium";
import FilterMonthlyBrokerNetPremium from "./components/Filter/FilterNetPerminum/FilterMonthlyBrokerNetPerimum";
import NetPremium from "./components/Filter/FilterNetPerminum/NetPerimum";
import FilterBrokerNetPremium from "./components/Filter/FilterNetPerminum/FilterBrokerNetPerimum";
import FilterPartnerNetPremium from "./components/Filter/FilterNetPerminum/FilterPartnerNetPremium";
import FilterPartnerFinalPremium from "./components/Filter/FilterFinalPreminum/FilterPartnerFinalPremium";
import FinalPremium from "./components/Filter/FilterFinalPreminum/FinalPerimum";
import FilterBrokerFinalPremium from "./components/Filter/FilterFinalPreminum/FilterBrokerFinalPerimum";
import YearlyNetPremium from "./components/TreeView/NetPremium/YearlyNetPremium";
import YearlyFinalNetPremium from "./components/TreeView/FinalNetPremium/YearlyFinalNetPremium";
import MonthlyNetPremium from "./components/TreeView/NetPremium/MonthlyNetPremium";
import MonthlyFinalNetPremium from "./components/TreeView/FinalNetPremium/MonthlyFinalPremium";
import MonthlyAllNetPremium from "./components/Filter/FilterNetPerminum/MonthlyAllNetPerimum";
import Ranks from "./components/Admin/Rank/Ranks/Ranks";
import AddRank from "./components/Admin/Rank/AddRank/addRank";
import BlogCategories from "./components/Website/BlogCategory/BlogCategories/Categories";
import AddBlogCategory from "./components/Website/BlogCategory/AddBlogCategory/AddBlogCategory";
import Blogs from "./components/Website/Blog/Blogs/Blogs";
import AddBlog from "./components/Website/Blog/AddBlog/AddBlog";
import News from "./components/Website/News/News/News";
import AddNews from "./components/Website/News/AddNews/AddNews";
import AddNewsCategory from "./components/Website/NewsCategory/AddNewsCategory/AddNewsCategory";
import NewsCategories from "./components/Website/NewsCategory/NewsCategories/NewsCategories";
import HrDashBoard from "./components/Dashboard/HrDashBoard";
import HolidayList from "./components/HR/Holidays/HolidayList";
import AddHoliday from "./components/HR/Holidays/AddHoliday";
import Attendance from "./components/HR/Attendance/AttendanceRecord/Attendance";
import EmployeeAttendance from "./components/HR/Attendance/AttendanceRecord/EmployeeAttendance";
import AddAttendance from "./components/HR/Attendance/AddAttendance/AddAttendance";
import MarkAttendance from "./components/HR/Attendance/MarkAttendance/MarkAttendance";
import ITDashboard from "./components/Dashboard/ITDashboard";
import UploadLogo from "./components/UploadLogo/UploadLogo";
import GetRenewals from "./components/Policy/Renewals/GetRenewals";
import UpdatePlan from "./components/UpdatePlan/UpdatePlan";
import PaymentForm from "./components/Payment/PaymentForm";
import UnAuthorizedPage from "./Auth/UnAuthorizedPage";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Signin />,
      },
    ],
  },

  {
    path: "/signup",
    children: [
      {
        path: "",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/rm",
    children: [
      {
        path: "",
        element: <RM />,
      },
    ],
  },
  {
    path: "/team-booking",
    children: [
      {
        path: "",
        element: <Bookings />,
      },
    ],
  },
  {
    path: "/accounts",
    children: [
      {
        path: "",
        element: <TeamAccounts />,
      },
    ],
  },
  {
    path: "/partners",
    children: [
      {
        path: "",
        element: <Partners />,
      },
    ],
  },
  {
    path: "/operations",
    children: [
      {
        path: "",
        element: <Operations />,
      },
    ],
  },
  {
    path: "dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
 
  {
    path: "/update-plan",
    children: [
      {
        path: "",
        element: <UpdatePlan />,
      },
    ],
  },
  {
    path: "/unauthorized",
    children: [
      {
        path: "",
        element: <UnAuthorizedPage />,
      },
    ],
  },
  {
    path: "lead",
    children: [
      {
        path: "",
        element: <Leads />,
      },
      {
        path: "new",
        element: <NewLeads />,
      },
      {
        path: "add",
        element: <AddLead />,
      },
      {
        path: "/lead/:leadId/edit",
        element: <EditLead />,
      },
      {
        path: "/lead/:leadId/quotation",
        element: <AddQuotation />,
      },
      {
        path: "/lead/:leadId/quotation/view",
        element: <ViewQuotation />,
      },
    ],
  },
  {
    path: "role",
    children: [
      {
        path: "",
        element: <Roles />,
      },
      {
        path: "add",
        element: <AddRole />,
      },
      {
        path: "/role/:roleId/edit",
        element: <AddRole />,
      },
    ],
  },
  {
    path: "website",
    children: [
      {
        path: "newscategory/add",
        element: <AddNewsCategory />,
      },
      {
        path: "newscategory/:categoryId/edit",
        element: <AddNewsCategory />,
      },
      {
        path: "newscategories",
        element: <NewsCategories />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/add",
        element: <AddNews />,
      },
      {
        path: "news/:blogId/edit",
        element: <AddNews />,
      },
      {
        path: "blogcategory/add",
        element: <AddBlogCategory />,
      },
      {
        path: "blogcategory/:categoryId/edit",
        element: <AddBlogCategory />,
      },
      {
        path: "blogcategories",
        element: <BlogCategories />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/add",
        element: <AddBlog />,
      },
      {
        path: "blogs/:blogId/edit",
        element: <AddBlog />,
      },
    ],
  },
  {
    path: "profile",
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "upload-logo",
    children: [
      {
        path: "",
        element: <UploadLogo />,
      },
    ],
  },
  {
    path: "payment",
    children: [
      {
        path: "",
        element: <PaymentForm />,
      },
    ],
  },
  {
    path: "finalpremium",
    children: [
      {
        path: "",
        element: <FinalPremium />,
      },
      {
        path: "/finalpremium/broker/company/:brokerId",
        element: <FilterBrokerFinalPremium />,
      },
      {
        path: "/finalpremium/partner/company/:partnerId",
        element: <FilterPartnerFinalPremium />,
      },
      {
        path: "monthly",
        element: <MonthlyFinalPremium />,
      },
      {
        path: "/finalpremium/monthly/broker/company/:startDate/:endDate/:brokerId",
        element: <FilterMonthlyBrokerFinalPremium />,
      },
      {
        path: "/finalpremium/monthly/partner/company/:startDate/:endDate/:partnerId",
        element: <FilterPartnerMonthlyFinalPremium />,
      },
    ],
  },
  {
    path: "netpremium",
    children: [
      {
        path: "",
        element: <NetPremium />,
      },
      {
        path: "/netpremium/broker/company/:brokerId",
        element: <FilterBrokerNetPremium />,
      },
      {
        path: "/netpremium/partner/company/:partnerId",
        element: <FilterPartnerNetPremium />,
      },
      {
        path: "monthly_preminum",
        element: <MonthlyAllNetPremium />,
      },
      {
        path: "monthly",
        element: <MonthlyNetPremium />,
      },
      {
        path: "/netpremium/monthly/broker/company/:startDate/:endDate/:brokerId",
        element: <FilterMonthlyBrokerNetPremium />,
      },
      {
        path: "/netpremium/monthly/partner/company/:startDate/:endDate/:partnerId",
        element: <FilterPartnerMonthlyNetPremium />,
      },
    ],
  },
  {
    path: "payins",
    children: [
      {
        path: "",
        element: <FilterPayIn />,
      },
      {
        path: "/payins/company/:brokerId",
        element: <CompanyFilterPayIn />,
      },
      {
        path: "monthly",
        element: <MonthlyFilterPayIn />,
      },
      {
        path: "/payins/monthly/company/:startDate/:endDate/:brokerId",
        element: <MonthlyCompanyFilterPayIn />,
      },
      {
        path: "recieved",
        element: <FilterReceivedPayInAmount />,
      },
      {
        path: "/payins/recieved/company/:brokerId",
        element: <CompanyFilterReceivedPayIn />,
      },
      {
        path: "recieved/monthly",
        element: <MonthlyFilterReceivedPayIn />,
      },
      {
        path: "/payins/monthly/recieved/company/:startDate/:endDate/:brokerId",
        element: <MonthlyCompanyFilterReceivedPayIn />,
      },
      {
        path: "balance",
        element: <FilterPayInBalance />,
      },
      {
        path: "/payins/balance/company/:brokerId",
        element: <CompanyFilterPayInBalance />,
      },
      {
        path: "/payins/balance/monthly/company/:startDate/:endDate/:brokerId",
        element: <MonthlyCompanyFilterPayInBalance />,
      },
      {
        path: "balance/monthly",
        element: <MonthlyFilterPayInBalance />,
      },
      {
        path: "leftDistributed",
        element: <FilterPayInLeftDistributed />,
      },
      {
        path: "/payins/leftDistributed/company/:brokerId",
        element: <CompanyFilterPayInLeftDistributed />,
      },
      {
        path: "leftDistributed/monthly",
        element: <MonthlyFilterPayInLeftDistributed />,
      },
      {
        path: "/payins/leftDistributed/monthly/company/:startDate/:endDate/:brokerId",
        element: <MonthlyCompanyFilterPayInLeftDistributed />,
      },
    ],
  },
  {
    path: "payouts",
    children: [
      {
        path: "",
        element: <FilterPayOut />,
      },
      {
        path: "paid",
        element: <FilterPaidPayOut />,
      },
      {
        path: "/payouts/paid/company/:partnerId",
        element: <CompanyFilterPayOutPaid />,
      },
      {
        path: "balance",
        element: <FilterPayOutBalance />,
      },
      {
        path: "/payouts/balance/company/:partnerId",
        element: <CompanyFilterPayOutBalance />,
      },
      {
        path: "leftDistributed",
        element: <FilterPayOutLeftDistributed />,
      },
      {
        path: "/payouts/leftDistributed/company/:partnerId",
        element: <CompanyFilterPayOutLeftDistributed />,
      },
      {
        path: "monthly/paid",
        element: <MonthlyPaidFilterPayOut />,
      },
      {
        path: "/payouts/monthly/paid/company/:startDate/:endDate/:partnerId",
        element: <MonthlyCompanyPaidFilterPayOut />,
      },
      {
        path: "monthly/balance",
        element: <MonthlyFilterPayOutBalance />,
      },
      {
        path: "/payouts/monthly/balance/company/:startDate/:endDate/:partnerId",
        element: <MonthlyCompanyFilterPayOutBalance />,
      },
      {
        path: "monthly/leftDistributed",
        element: <MonthlyFilterPayOutLeftDistributed />,
      },
      {
        path: "/payouts/monthly/leftDistributed/company/:startDate/:endDate/:partnerId",
        element: <MonthlyCompanyFilterPayOutLeftDistributed />,
      },
      {
        path: "monthly",
        element: <MonthlyFilterPayOut />,
      },
      {
        path: "month_payout",
        element: <MonthlyPayout />,
      },
      {
        path: "year_payout",
        element: <YearlyPayout />,
      },
      {
        path: "month_payin",
        element: <MonthlyPayIn />,
      },
      {
        path: "year_payin",
        element: <YearlyPayIn />,
      },
      {
        path: "/payouts/company/:partnerId",
        element: <CompanyFilterPayOut />,
      },
      {
        path: "/payouts/monthly/company/:startDate/:endDate/:partnerId",
        element: <MonthlyCompanyFilterPayOut />,
      },
      {
        path: "year_netPremium",
        element: <YearlyNetPremium />,
      },
      {
        path: "year_final_netPremium",
        element: <YearlyFinalNetPremium />,
      },
      {
        path: "month_netPremium",
        element: <MonthlyNetPremium />,
      },
      {
        path: "month_final_premium",
        element: <MonthlyFinalNetPremium />,
      },
    ],
  },
  {
    path: "account",
    children: [
      {
        path: "",
        element: <Accounts />,
      },
      {
        path: "/account/partner-debit",
        element: <PartnerDebit />,
      },
      {
        path: "/account/broker-credit",
        element: <BrokerCredit />,
      },
      {
        path: "/account/broker-payment-compare",
        element: <CompareBrokerPayment />,
      },
      {
        path: "/account/partner-payment-compare",
        element: <ComparePartnerPayment />,
      },
      {
        path: "creditdebit",
        element: <CreditDebits />,
      },
      {
        path: "/account/creditdebit/broker-payment/view",
        element: <ViewCreditDebitByBrokerCard />,
      },
      {
        path: "/account/creditdebit/partner-payment/view",
        element: <ViewCreditDebitByPartnerCard />,
      },
      {
        path: "/account/creditdebit/:accountId/view",
        element: <ViewAccountCreditDebitsDetails />,
      },
      {
        path: "/account/creditdebit/add",
        element: <AddCreditDebits />,
      },
      {
        path: "/account/creditdebit/:creditDebitId/edit",
        element: <AddCreditDebits />,
      },
      {
        path: "add",
        element: <AddAccounts />,
      },
      {
        path: "/account/:accountId/edit",
        element: <AddAccounts />,
      },
      {
        path: "/account/broker/update-payment",
        element: <UpdatePayment />,
      },
      {
        path: "/account/partner/update-payment",
        element: <ManagePartnerPayment />,
      },
      {
        path: "/account/excel-payIn",
        element: <ExcelPayIn />,
      },
      {
        path: "/account/excel-payOut",
        element: <ExcelPayout />,
      },
    ],
  },
  {
    path: "booking",
    children: [
      {
        path: "",
        element: <BookingRequests />,
      },
      {
        path: "new",
        element: <NewBookingRequests />,
      },
      {
        path: "reject",
        element: <RejectionPolicies />,
      },
      {
        path: "add",
        element: <AddBookingRequest />,
      },
      {
        path: "accepted",
        element: <AcceptedBooking />,
      },
      {
        path: "/booking/:leadId/new",
        element: <AddBookingRequest />,
      },
    ],
  },
  {
    path: "policytype",
    children: [
      {
        path: "",
        element: <PolicyTypes />,
      },
      {
        path: "add",
        element: <AddPolicyType />,
      },
      {
        path: "/policytype/:policyTypeId/edit",
        element: <AddPolicyType />,
      },
    ],
  },
  {
    path: "policy",
    children: [
      {
        path: "/policy/renewals",
        element: <GetRenewals />,
      },
      {
        path: "/policy/motor/upload",
        element: <PolicyPDF />,
      },
      {
        path: "/policy/motor/excel/upload",
        element: <UploadPolicy />,
      },
      {
        path: "/policy/motor/add",
        element: <AddMotorPolicy />,
      },
      {
        path: "/policy/motor/:bookingRequestId",
        element: <EditMotorPolicy />,
      },
      {
        path: "/policy/:policyId/view",
        element: <ViewPolicy />,
      },
      {
        path: "/policy/:policyId",
        element: <ViewPolicyDetails />,
      },
      {
        path: "/policy/:policyId/edit",
        element: <AddMotorPolicy />,
      },
      {
        path: "/policy/:policyId/commission",
        element: <EditCommission />,
      },
      {
        path: "motor-policies",
        element: <GetMotorPolicies />,
      },
      {
        path: "archive",
        element: <GetArchiveMotorPolicies />,
      },
    ],
  },
  {
    path: "ranks",
    children: [
      {
        path: "",
        element: <Ranks />,
      },
      {
        path: "add",
        element: <AddRank />,
      },
      {
        path: "/ranks/:rankId/edit",
        element: <AddRank />,
      },
    ],
  },
  {
    path: "team",
    children: [
      {
        path: "",
        element: <Teams />,
      },
      {
        path: "add",
        element: <AddTeam />,
      },
      {
        path: "/team/:teamId/edit",
        element: <AddTeam />,
      },
    ],
  },
  {
    path: "subproducts",
    children: [
      {
        path: "",
        element: <ProductSubTypes />,
      },
      {
        path: "add",
        element: <AddProductSubType />,
      },
      {
        path: "/subproducts/:productSubTypeId/edit",
        element: <AddProductSubType />,
      },
      {
        path: "/subproducts/add/:productId",
        element: <AddProductSubType />,
      },
    ],
  },
  {
    path: "casetype",
    children: [
      {
        path: "",
        element: <CaseTypes />,
      },
      {
        path: "add",
        element: <AddCaseType />,
      },
      {
        path: "/casetype/:caseTypeId/edit",
        element: <AddCaseType />,
      },
    ],
  },
  {
    path: "fueltype",
    children: [
      {
        path: "",
        element: <FuelTypes />,
      },
      {
        path: "add",
        element: <AddFuelType />,
      },
      {
        path: "/fueltype/:fuelTypeId/edit",
        element: <AddFuelType />,
      },
    ],
  },
  {
    path: "commision",
    children: [
      {
        path: "payout",
        element: <PayOutUploadByExcel />,
      },
      {
        path: "payin",
        element: <PayInUploadByExcel />,
      },
      {
        path: "percentage",
        element: <Percentage />,
      },
    ],
  },
  {
    path: "calculate",
    children: [],
  },
  {
    path: "products",
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "/products/:productId/edit",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "companies",
    children: [
      {
        path: "",
        element: <Companies />,
      },
      {
        path: "add",
        element: <AddCompany />,
      },
      {
        path: "/companies/:companyId/edit",
        element: <AddCompany />,
      },
    ],
  },
  {
    path: "brokers",
    children: [
      {
        path: "",
        element: <Brokers />,
      },
      {
        path: "add",
        element: <AddBroker />,
      },
      {
        path: "/brokers/:brokerId/edit",
        element: <AddBroker />,
      },
    ],
  },
  {
    path: "branch",
    children: [
      {
        path: "",
        element: <Branches />,
      },
      {
        path: "add",
        element: <AddBranch />,
      },
      {
        path: "/branch/:branchId/edit",
        element: <AddBranch />,
      },
    ],
  },
  {
    path: "categories",
    children: [
      {
        path: "",
        element: <Categories />,
      },
      {
        path: "add",
        element: <AddCategory />,
      },
      {
        path: "/categories/:categoryId/edit",
        element: <AddCategory />,
      },
    ],
  },
  {
    path: "models",
    children: [
      {
        path: "",
        element: <Models />,
      },
      {
        path: "add",
        element: <AddModel />,
      },
      {
        path: "/models/:modelId/edit",
        element: <AddModel />,
      },
    ],
  },
  {
    path: "makes",
    children: [
      {
        path: "",
        element: <Makes />,
      },
      {
        path: "add",
        element: <AddMake />,
      },
      {
        path: "/makes/:makeId/edit",
        element: <AddMake />,
      },
    ],
  },
  {
    path: "accountdashboard",
    children: [
      {
        path: "",
        element: <AccountDashboard />,
      },
    ],
  },
  {
    path: "operationdashboard",
    children: [
      {
        path: "",
        element: <OperationDashboard />,
      },
    ],
  },
  {
    path: "partnerdashboard",
    children: [
      {
        path: "",
        element: <PartnerDashboard />,
      },
      {
        path: "/partnerdashboard/card",
        element: <ViewCardHistory />,
      },
      {
        path: "/partnerdashboard/withdrawal",
        element: <ManageCards />,
      },
      {
        path: "/partnerdashboard/withdrawal/:partnerId",
        element: <ManageCards />,
      },
      {
        path: "/partnerdashboard/:transactionCode/:partnerId/:startDate/:endDate/card-history",
        element: <ViewCardHistory />,
      },
    ],
  },
  {
    path: "rm",
    children: [
      {
        path: "dashboard",
        element: <RMDashboard />,
      },
      {
        path: "rm_polices",
        element: <RMGetMotorPolicies />,
      },
      {
        path: "rm_team",
        element: <RmTeams />,
      },
      {
        path: "lead",
        element: <RmLead />,
      },
      {
        path: "requested",
        element: <RmRequestedBooking />,
      },
    ],
  },
  {
    path: "bookingdashboard",
    children: [
      {
        path: "",
        element: <BookingDashboard />,
      },
    ],
  },
  {
    path: "403",
    children: [
      {
        path: "",
        element: <Page403 />,
      },
    ],
  },
  {
    path: "filter",
    children: [
      {
        path: "",
        element: <Filter />,
      },
    ],
  },
  {
    path: "notification",
    children: [
      {
        path: "",
        element: <Notification />,
      },
    ],
  },
  {
    path: "hr",
    children: [
      {
        path: "dashboard",
        element: <HrDashBoard />,
      },
      {
        path: "holidays",
        element: <HolidayList />,
      },
      {
        path: "add-holiday",
        element: <AddHoliday />,
      },
      {
        path: `edit-holiday/:holidayId`,
        element: <AddHoliday />,
      },
      {
        path: `attendance`,
        element: <Attendance />,
      },
      {
        path: `attendance/:employeeId`,
        element: <EmployeeAttendance />,
      },
      {
        path: "add-attendance",
        element: <AddAttendance />,
      },
      {
        path: `/hr/edit-attendance/:id`,
        element: <AddAttendance />,
      },
    ],
  },
  {
    path: "mark-attendance",
    element: <MarkAttendance />,
  },
  {
    path: "it/dashboard",
    element: <ITDashboard />,
  },
];
export default routes;
