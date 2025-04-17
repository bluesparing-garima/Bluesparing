import { lazy } from "react";

import Signin from "./Auth/Signin";
import SuspenseWrapper from "./utils/ui/SpanceWrapper";
import PublishedPolicyPage from "./components/Policy/PublishedPolicy/PublishedPolicyPage";
import BookedBooking from "./components/Booking/BookingRequests/BookedBooking";
import AllBookingReq from "./components/Booking/BookingRequests/AllBooking";
import TransferMoney from "./components/Account/TransferMoney/TransferMoney";
import Checkout from "./components/UpdatePlan/Checkout";
import { elements } from "chart.js";
import UploadPolicyPdf from "./components/Partner/Leads/UploadPolicyPdf";
import Client from "./components/Client/Client";
import WelcomePage from "./components/Dashboard/WelcomeScreen";

import ComingSoonHealth from "./components/Health/ComingSoonHealth";
import ComingSoonNonMotor from "./components/NonMotor/ComingSoonNonMotor";
import AddHealthPolicy from "./components/Health/AddPolicy/AddHealthPolicy";

const Dashboard = lazy(() => import("./components/Dashboard/dashboard"));
const PartnerDashboard = lazy(
  () => import("./components/Dashboard/partnerDashboard")
);
const BookingDashboard = lazy(
  () => import("./components/Dashboard/bookingDashboard")
);
const Roles = lazy(() => import("./components/Admin/Role/Roles/Roles"));
const AddRole = lazy(() => import("./components/Admin/Role/AddRole/addRole"));
const Products = lazy(
  () => import("./components/Admin/Product/Products/Products")
);
const AddProduct = lazy(
  () => import("./components/Admin/Product/AddProduct/addProduct")
);
const AddPolicyType = lazy(
  () => import("./components/Admin/PolicyType/AddPolicyType/AddPolicyType")
);
const PolicyTypes = lazy(
  () => import("./components/Admin/PolicyType/PolicyTypes/PolicyTypes")
);
const CaseTypes = lazy(
  () => import("./components/Admin/CaseType/CaseTypes/CaseTypes")
);
const AddCaseType = lazy(
  () => import("./components/Admin/CaseType/AddCaseType/addCaseType")
);
const AddMotorPolicy = lazy(
  () => import("./components/Policy/AddPolicy/AddPolicy")
);
const EditMotorPolicy = lazy(
  () => import("./components/Policy/EditPolicy/EditPolicy")
);
const GetMotorPolicies = lazy(
  () => import("./components/Policy/GetMotorPolicies/GetMotorPolicies")
);
const PayInUploadByExcel = lazy(
  () =>
    import(
      "./components/Admin/Percentage/PayInUploadByExcel/PayInUploadByExcel"
    )
);
const PayOutUploadByExcel = lazy(
  () =>
    import(
      "./components/Admin/Percentage/PayOutUploadByExcel/payOutUploadByExcel"
    )
);
const AddProductSubType = lazy(
  () =>
    import(
      "./components/Admin/ProductSubType/AddProductSubType/AddProductSubType"
    )
);
const ProductSubTypes = lazy(
  () =>
    import("./components/Admin/ProductSubType/ProductSubTypes/ProductSubTypes")
);
const AddCompany = lazy(
  () => import("./components/Admin/Company/AddCompany/addCompany")
);
const Companies = lazy(
  () => import("./components/Admin/Company/Companies/Companies")
);
const Brokers = lazy(() => import("./components/Admin/Broker/Brokers/Brokers"));
const AddBroker = lazy(
  () => import("./components/Admin/Broker/AddBroker/addBroker")
);
const AddBranch = lazy(
  () => import("./components/Admin/Branch/AddBranch/addBranch")
);
const Branches = lazy(
  () => import("./components/Admin/Branch/Branches/Branches")
);
const Categories = lazy(
  () => import("./components/Admin/Category/Categories/Categories")
);
const AddCategory = lazy(
  () => import("./components/Admin/Category/AddCategory/AddCategory")
);
const AddFuelType = lazy(
  () => import("./components/Admin/FuelType/AddFuelType/addFuelType")
);
const FuelTypes = lazy(
  () => import("./components/Admin/FuelType/FuelTypes/FuelTypes")
);
const AddMake = lazy(() => import("./components/Admin/Make/AddMake/addMake"));
const Makes = lazy(() => import("./components/Admin/Make/Makes/Makes"));
const Models = lazy(() => import("./components/Admin/Model/Models/Models"));
const AddModel = lazy(
  () => import("./components/Admin/Model/AddModel/addModel")
);
const ViewPolicy = lazy(
  () => import("./components/Policy/ViewPolicy/ViewPolicy")
);
const Teams = lazy(() => import("./components/Admin/Team/Teams/Teams"));
const AddTeam = lazy(() => import("./components/Admin/Team/AddTeam/AddTeam"));
const Page403 = lazy(() => import("./Auth/Page403"));
const AddBookingRequest = lazy(
  () => import("./components/Booking/AddBookingRequest/AddBookingRequest")
);
const BookingRequests = lazy(
  () => import("./components/Booking/BookingRequests/BookingRequests")
);
const AddLead = lazy(() => import("./components/Partner/AddLead/AddLead"));
const Leads = lazy(() => import("./components/Partner/Leads/leads"));
const NewLeads = lazy(() => import("./components/Partner/Leads/Newleads"));
const EditLead = lazy(() => import("./components/Partner/EditLead/editLead"));
const AddQuotation = lazy(
  () => import("./components/Partner/Quotation/AddQuotation/AddQuotation")
);
const ViewQuotation = lazy(
  () => import("./components/Partner/Quotation/ViewQuotation/ViewQuotation")
);
const NewBookingRequests = lazy(
  () => import("./components/Booking/BookingRequests/NewBookingRequests")
);
const EditCommission = lazy(
  () => import("./components/Policy/EditCommsion/editCommison")
);
const AddAccounts = lazy(
  () => import("./components/Account/AddAcoounts/AddAccounts")
);
const Accounts = lazy(() => import("./components/Account/Accounts/Accounts"));
const CompareBrokerPayment = lazy(
  () => import("./components/Account/CompareBrokerPayment/compareBrokerPayment")
);
const CreditDebits = lazy(
  () => import("./components/Account/CreditDebit/CreditDebits/CreditDebits")
);
const AddCreditDebits = lazy(
  () => import("./components/Account/CreditDebit/AddCreditDebit/AddCreditDebit")
);
const AccountDashboard = lazy(
  () => import("./components/Dashboard/accountDashboard")
);
const UpdatePayment = lazy(
  () =>
    import(
      "./components/Account/UpdatePayments/ManageBrokerPayment/ManageBrokerPayment"
    )
);
const ManagePartnerPayment = lazy(
  () =>
    import(
      "./components/Account/UpdatePayments/ManagePartnerPayment/ManagePartnerPayment"
    )
);
const ComparePartnerPayment = lazy(
  () =>
    import("./components/Account/ComparePartnerPayment/comparePartnerPayment")
);
const ViewAccountCreditDebitsDetails = lazy(
  () =>
    import(
      "./components/Account/Accounts/ViewAccountDetails/ViewAccountCreditDebitsDetails"
    )
);
const ViewCreditDebitByBrokerCard = lazy(
  () =>
    import(
      "./components/Account/CreditDebit/ViewCreditDebitByBroker/ViewCreditDebitByBrokerCard"
    )
);
const ViewCreditDebitByPartnerCard = lazy(
  () =>
    import(
      "./components/Account/CreditDebit/ViewCreditDebitByPartner/ViewCreditDebitByPartnerCard"
    )
);
const Percentage = lazy(
  () => import("./components/Admin/Percentage/Percentage/Percentage")
);
const ManageCards = lazy(
  () => import("./components/Partner/ManageCard/manageCards")
);
const ViewCardHistory = lazy(
  () => import("./components/Partner/ManageCard/ViewCardHistory")
);
const PartnerDebit = lazy(
  () => import("./components/Account/UpdatePayments/PartnerDebit/PartnerDebit")
);
const ViewPolicyDetails = lazy(
  () => import("./components/Policy/ViewPolicy/ViewPolicyDetails")
);
const OperationDashboard = lazy(
  () => import("./components/Dashboard/operationDashboard")
);
const BrokerCredit = lazy(
  () => import("./components/Account/UpdatePayments/BrokerCredit/BrokerCredit")
);
const GetArchiveMotorPolicies = lazy(
  () => import("./components/Policy/GetMotorPolicies/GetArchiveMotorPolicies")
);
const RejectionPolicies = lazy(
  () => import("./components/Booking/BookingRequests/RejectionPolicies")
);
const Partners = lazy(() => import("./components/Admin/Team/Teams/Partners"));
const Operations = lazy(
  () => import("./components/Admin/Team/Teams/Operations")
);
const RM = lazy(() => import("./components/Admin/Team/Teams/RM"));
const Bookings = lazy(() => import("./components/Admin/Team/Teams/Bookings"));
const TeamAccounts = lazy(
  () => import("./components/Admin/Team/Teams/Accounts")
);
const Filter = lazy(() => import("./components/Filter/FilterPolicy/Filter"));
const Notification = lazy(
  () => import("./components/Notification/Notification")
);
const PolicyPDF = lazy(() => import("./components/Policy/PolicyPDF/PolicyPDF"));
const ProfilePage = lazy(() => import("./components/Profile/ProfilePage"));
const AcceptedBooking = lazy(
  () => import("./components/Booking/AcceptedBooking/AcceptedBooking")
);
const UploadPolicy = lazy(
  () => import("./components/Policy/UploadPolicy/UploadPolicy")
);
const FilterPayOut = lazy(
  () => import("./components/Filter/FilterPayOut/FilterPayOut")
);
const FilterPayIn = lazy(
  () => import("./components/Filter/FilterPayIn/FilterPayIn")
);
const MonthlyFilterPayOut = lazy(
  () => import("./components/Filter/FilterPayOut/MonthlyFilterPayOut")
);
const MonthlyFilterPayIn = lazy(
  () => import("./components/Filter/FilterPayIn/MonthlyFilterPayIn")
);
const MonthlyCompanyFilterPayOut = lazy(
  () => import("./components/Filter/FilterPayOut/MonthlyCompanyFilterPayOut")
);
const MonthlyCompanyFilterPayIn = lazy(
  () => import("./components/Filter/FilterPayIn/MonthlyCompanyFilterPayIn")
);
const CompanyFilterPayIn = lazy(
  () => import("./components/Filter/FilterPayIn/CompanyFilterPayIn")
);
const CompanyFilterPayOut = lazy(
  () => import("./components/Filter/FilterPayOut/CompanyFilterPayOut")
);
const ExcelPayIn = lazy(
  () => import("./components/Account/ExcelPayIn&Payout/ExcelPayIn")
);
const ExcelPayout = lazy(
  () => import("./components/Account/ExcelPayIn&Payout/ExcelPayout")
);
const RMDashboard = lazy(() => import("./components/Dashboard/RMDashboard"));
const RMGetMotorPolicies = lazy(
  () => import("./components/Policy/GetMotorPolicies/RMGetMotorPolicies")
);
const RmTeams = lazy(() => import("./components/Admin/Team/Teams/RmTeam"));
const RmLead = lazy(() => import("./components/Rm/RmLead"));
const RmRequestedBooking = lazy(
  () => import("./components/Booking/BookingRequests/RmRequestedBooking")
);
const MonthlyPayout = lazy(
  () => import("./components/TreeView/PayOut/MonthlyPayout")
);
const FilterReceivedPayInAmount = lazy(
  () =>
    import(
      "./components/Filter/FilterRecievedPayInAmount/FilterRecievedPayInAmount"
    )
);
const CompanyFilterReceivedPayIn = lazy(
  () =>
    import(
      "./components/Filter/FilterRecievedPayInAmount/CompanyFilterRecievedPayIn"
    )
);
const MonthlyFilterReceivedPayIn = lazy(
  () =>
    import(
      "./components/Filter/FilterRecievedPayInAmount/MonthlyFilterRecievedPayIn"
    )
);
const MonthlyCompanyFilterReceivedPayIn = lazy(
  () =>
    import(
      "./components/Filter/FilterRecievedPayInAmount/MonthlyCompanyFilterRecievedPayIn"
    )
);
const FilterPayInBalance = lazy(
  () => import("./components/Filter/FilterPayInBalance/FilterPayInBalance")
);
const CompanyFilterPayInBalance = lazy(
  () =>
    import("./components/Filter/FilterPayInBalance/CompanyFilterPayInBalance")
);
const MonthlyCompanyFilterPayInBalance = lazy(
  () =>
    import(
      "./components/Filter/FilterPayInBalance/MonthlyCompanyFilterPayInBalance"
    )
);
const MonthlyFilterPayInBalance = lazy(
  () =>
    import("./components/Filter/FilterPayInBalance/MonthlyFilterPayInBalance")
);
const FilterPayInLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayInLeftDistributed/FilterPayInLeftDistributed"
    )
);
const CompanyFilterPayInLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayInLeftDistributed/CompanyFilterPayInLeftDistributed"
    )
);
const MonthlyCompanyFilterPayInLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayInLeftDistributed/MonthlyCompanyFilterPayInLeftDistributed"
    )
);
const MonthlyFilterPayInLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayInLeftDistributed/MonthlyFilterPayInLeftDistributed"
    )
);
const MonthlyPaidFilterPayOut = lazy(
  () => import("./components/Filter/FilterPaidPayOut/MonthlyPaidFilterPayOut")
);
const MonthlyCompanyPaidFilterPayOut = lazy(
  () =>
    import(
      "./components/Filter/FilterPaidPayOut/MonthlyCompanyPaidFilterPayOut"
    )
);
const MonthlyFilterPayOutBalance = lazy(
  () =>
    import("./components/Filter/FilterPayOutBalance/MonthlyFilterPayOutBalance")
);
const MonthlyCompanyFilterPayOutBalance = lazy(
  () =>
    import(
      "./components/Filter/FilterPayOutBalance/MonthlyCompanyFilterPayOutBalance"
    )
);
const MonthlyFilterPayOutLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayOutLeftDistributed/MonthlyFilterPayOutLeftDistributed"
    )
);
const MonthlyCompanyFilterPayOutLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayOutLeftDistributed/MonthlyCompanyFilterPayOutLeftDistributed"
    )
);
const YearlyPayout = lazy(
  () => import("./components/TreeView/PayOut/YearlyPayOut")
);
const YearlyPayIn = lazy(
  () => import("./components/TreeView/PayIn/YearlyPayIn")
);
const MonthlyPayIn = lazy(
  () => import("./components/TreeView/PayIn/MonthlyPayIn")
);
const FilterPaidPayOut = lazy(
  () => import("./components/Filter/FilterPaidPayOut/FilterPaidPayOut")
);
const FilterPayOutBalance = lazy(
  () => import("./components/Filter/FilterPayOutBalance/FilterPayOutBalance")
);
const CompanyFilterPayOutBalance = lazy(
  () =>
    import("./components/Filter/FilterPayOutBalance/CompanyFilterPayOutBalance")
);
const FilterPayOutLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayOutLeftDistributed/FilterPayOutLeftDistributed"
    )
);
const CompanyFilterPayOutLeftDistributed = lazy(
  () =>
    import(
      "./components/Filter/FilterPayOutLeftDistributed/CompanyFilterPayOutLeftDistributed"
    )
);
const CompanyFilterPayOutPaid = lazy(
  () => import("./components/Filter/FilterPaidPayOut/CompanyFilterPayOutPaid")
);
const FilterPartnerMonthlyNetPremium = lazy(
  () =>
    import(
      "./components/Filter/FilterNetPerminum/FilterPartnerMonthlyNetPremium"
    )
);
const MonthlyFinalPremium = lazy(
  () => import("./components/Filter/FilterFinalPreminum/MonthlyFinalPremium")
);
const FilterMonthlyBrokerFinalPremium = lazy(
  () =>
    import(
      "./components/Filter/FilterFinalPreminum/FilterMonthlyBrokerFinalPremium"
    )
);
const FilterPartnerMonthlyFinalPremium = lazy(
  () =>
    import(
      "./components/Filter/FilterFinalPreminum/FilterPartnerMonthlyFinalPremium"
    )
);
const FilterMonthlyBrokerNetPremium = lazy(
  () =>
    import(
      "./components/Filter/FilterNetPerminum/FilterMonthlyBrokerNetPerimum"
    )
);
const NetPremium = lazy(
  () => import("./components/Filter/FilterNetPerminum/NetPerimum")
);
const FilterBrokerNetPremium = lazy(
  () => import("./components/Filter/FilterNetPerminum/FilterBrokerNetPerimum")
);
const FilterPartnerNetPremium = lazy(
  () => import("./components/Filter/FilterNetPerminum/FilterPartnerNetPremium")
);
const FilterPartnerFinalPremium = lazy(
  () =>
    import("./components/Filter/FilterFinalPreminum/FilterPartnerFinalPremium")
);
const FinalPremium = lazy(
  () => import("./components/Filter/FilterFinalPreminum/FinalPerimum")
);
const FilterBrokerFinalPremium = lazy(
  () =>
    import("./components/Filter/FilterFinalPreminum/FilterBrokerFinalPerimum")
);
const YearlyNetPremium = lazy(
  () => import("./components/TreeView/NetPremium/YearlyNetPremium")
);
const YearlyFinalNetPremium = lazy(
  () => import("./components/TreeView/FinalNetPremium/YearlyFinalNetPremium")
);
const MonthlyNetPremium = lazy(
  () => import("./components/TreeView/NetPremium/MonthlyNetPremium")
);
const MonthlyFinalNetPremium = lazy(
  () => import("./components/TreeView/FinalNetPremium/MonthlyFinalPremium")
);
const MonthlyAllNetPremium = lazy(
  () => import("./components/Filter/FilterNetPerminum/MonthlyAllNetPerimum")
);
const Ranks = lazy(() => import("./components/Admin/Rank/Ranks/Ranks"));
const AddRank = lazy(() => import("./components/Admin/Rank/AddRank/addRank"));
const BlogCategories = lazy(
  () => import("./components/Website/BlogCategory/BlogCategories/Categories")
);
const AddBlogCategory = lazy(
  () =>
    import("./components/Website/BlogCategory/AddBlogCategory/AddBlogCategory")
);
const Blogs = lazy(() => import("./components/Website/Blog/Blogs/Blogs"));
const AddBlog = lazy(() => import("./components/Website/Blog/AddBlog/AddBlog"));
const News = lazy(() => import("./components/Website/News/News/News"));
const AddNews = lazy(() => import("./components/Website/News/AddNews/AddNews"));
const AddNewsCategory = lazy(
  () =>
    import("./components/Website/NewsCategory/AddNewsCategory/AddNewsCategory")
);
const NewsCategories = lazy(
  () =>
    import("./components/Website/NewsCategory/NewsCategories/NewsCategories")
);
const HrDashBoard = lazy(() => import("./components/Dashboard/HrDashBoard"));
const HolidayList = lazy(() => import("./components/HR/Holidays/HolidayList"));
const AddHoliday = lazy(() => import("./components/HR/Holidays/AddHoliday"));
const Attendance = lazy(
  () => import("./components/HR/Attendance/AttendanceRecord/Attendance")
);
const EmployeeAttendance = lazy(
  () => import("./components/HR/Attendance/AttendanceRecord/EmployeeAttendance")
);
const AddAttendance = lazy(
  () => import("./components/HR/Attendance/AddAttendance/AddAttendance")
);
const MarkAttendance = lazy(
  () => import("./components/HR/Attendance/MarkAttendance/MarkAttendance")
);
const ITDashboard = lazy(() => import("./components/Dashboard/ITDashboard"));
const UploadLogo = lazy(() => import("./components/UploadLogo/UploadLogo"));
const GetRenewals = lazy(
  () => import("./components/Policy/Renewals/GetRenewals")
);
const UpdatePlan = lazy(() => import("./components/UpdatePlan/UpdatePlan"));
const UnAuthorizedPage = lazy(() => import("./Auth/UnAuthorizedPage"));
const Subscription = lazy(
  () => import("./components/Subscrition/Subscription")
);
const BrokerWallet = lazy(() => import("./components/Broker/BrokerWallet"));
const BrokerPoliciesTransaction = lazy(
  () => import("./components/Broker/BrokerPoliciesTransaction")
);
const PartnerPolicyTransactions = lazy(
  () => import("./components/Partner/Wallet/PartnerPolicyTransactions")
);
const PartnerWallet = lazy(
  () => import("./components/Partner/Wallet/PartnerWallet")
);
const TdsPayInManage = lazy(
  () => import("./components/Account/TDS/PayInTDS/TdsPayInManage")
);
const TdsPayOutManage = lazy(
  () => import("./components/Account/TDS/PayOutTDS/TdsPayOutManage")
);
const DisputedPolicyPage = lazy(
  () => import("./components/Policy/PolicyDispute/DisputedPolicyPage")
);
const PolicyDispute = lazy(
  () => import("./components/Policy/PolicyDispute/PolicyDispute")
);
const SignUp = lazy(() => import("./Auth/Signup"));

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
    path: "/welcome",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <WelcomePage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/client",
    children: [
      {
        path: "",
        element: <Client />,
      },
    ],
  },
  {
    path: "/signup",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <SignUp />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/rm",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <RM />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/team-booking",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Bookings />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/accounts",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <TeamAccounts />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  {
    path: "/partners",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Partners />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/operations",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Operations />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  {
    path: "/update-plan",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <UpdatePlan />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/plan-details",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <UpdatePlan />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/checkout",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Checkout />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <UnAuthorizedPage title="You are unauthorized." />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "plan-exhausted",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <UnAuthorizedPage title="Policy limit exceeded for your plan" />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "lead",
    children: [
      {
        path: "upload-policy-pdf",
        element: (<SuspenseWrapper>
          <UploadPolicyPdf />
        </SuspenseWrapper>)
      },
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Leads />
          </SuspenseWrapper>
        ),
      },
      {
        path: "new",
        element: (
          <SuspenseWrapper>
            <NewLeads />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddLead />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/lead/:leadId/edit",
        element: (
          <SuspenseWrapper>
            <EditLead />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/lead/:leadId/quotation",
        element: (
          <SuspenseWrapper>
            <AddQuotation />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/lead/:leadId/quotation/view",
        element: (
          <SuspenseWrapper>
            <ViewQuotation />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "role",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Roles />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddRole />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/role/:roleId/edit",
        element: (
          <SuspenseWrapper>
            <AddRole />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "website",
    children: [
      {
        path: "newscategory/add",
        element: (
          <SuspenseWrapper>
            <AddNewsCategory />
          </SuspenseWrapper>
        ),
      },
      {
        path: "newscategory/:categoryId/edit",
        element: (
          <SuspenseWrapper>
            <AddNewsCategory />
          </SuspenseWrapper>
        ),
      },
      {
        path: "newscategories",
        element: (
          <SuspenseWrapper>
            <NewsCategories />
          </SuspenseWrapper>
        ),
      },
      {
        path: "news",
        element: (
          <SuspenseWrapper>
            <News />
          </SuspenseWrapper>
        ),
      },
      {
        path: "news/add",
        element: (
          <SuspenseWrapper>
            <AddNews />
          </SuspenseWrapper>
        ),
      },
      {
        path: "news/:blogId/edit",
        element: (
          <SuspenseWrapper>
            <AddNews />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogcategory/add",
        element: (
          <SuspenseWrapper>
            <AddBlogCategory />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogcategory/:categoryId/edit",
        element: (
          <SuspenseWrapper>
            <AddBlogCategory />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogcategories",
        element: (
          <SuspenseWrapper>
            <BlogCategories />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogs",
        element: (
          <SuspenseWrapper>
            <Blogs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogs/add",
        element: (
          <SuspenseWrapper>
            <AddBlog />
          </SuspenseWrapper>
        ),
      },
      {
        path: "blogs/:blogId/edit",
        element: (
          <SuspenseWrapper>
            <AddBlog />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "profile",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "upload-logo",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <UploadLogo />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "subscription",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Subscription />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "finalpremium",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <FinalPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/finalpremium/broker/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <FilterBrokerFinalPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/finalpremium/partner/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <FilterPartnerFinalPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFinalPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/finalpremium/monthly/broker/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <FilterMonthlyBrokerFinalPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/finalpremium/monthly/partner/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <FilterPartnerMonthlyFinalPremium />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "netpremium",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <NetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/netpremium/broker/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <FilterBrokerNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/netpremium/partner/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <FilterPartnerNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly_preminum",
        element: (
          <SuspenseWrapper>
            <MonthlyAllNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/netpremium/monthly/broker/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <FilterMonthlyBrokerNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/netpremium/monthly/partner/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <FilterPartnerMonthlyNetPremium />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "payins",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <FilterPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/monthly/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "recieved",
        element: (
          <SuspenseWrapper>
            <FilterReceivedPayInAmount />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/recieved/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterReceivedPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "recieved/monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterReceivedPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/monthly/recieved/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterReceivedPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "balance",
        element: (
          <SuspenseWrapper>
            <FilterPayInBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/balance/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayInBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/balance/monthly/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayInBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "balance/monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayInBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "leftDistributed",
        element: (
          <SuspenseWrapper>
            <FilterPayInLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/leftDistributed/company/:brokerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayInLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "leftDistributed/monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayInLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payins/leftDistributed/monthly/company/:startDate/:endDate/:brokerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayInLeftDistributed />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "payouts",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <FilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "paid",
        element: (
          <SuspenseWrapper>
            <FilterPaidPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/paid/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayOutPaid />
          </SuspenseWrapper>
        ),
      },
      {
        path: "balance",
        element: (
          <SuspenseWrapper>
            <FilterPayOutBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/balance/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayOutBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "leftDistributed",
        element: (
          <SuspenseWrapper>
            <FilterPayOutLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/leftDistributed/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayOutLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly/paid",
        element: (
          <SuspenseWrapper>
            <MonthlyPaidFilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/monthly/paid/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyPaidFilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly/balance",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayOutBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/monthly/balance/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayOutBalance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly/leftDistributed",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayOutLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/monthly/leftDistributed/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayOutLeftDistributed />
          </SuspenseWrapper>
        ),
      },
      {
        path: "monthly",
        element: (
          <SuspenseWrapper>
            <MonthlyFilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "month_payout",
        element: (
          <SuspenseWrapper>
            <MonthlyPayout />
          </SuspenseWrapper>
        ),
      },
      {
        path: "year_payout",
        element: (
          <SuspenseWrapper>
            <YearlyPayout />
          </SuspenseWrapper>
        ),
      },
      {
        path: "month_payin",
        element: (
          <SuspenseWrapper>
            <MonthlyPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "year_payin",
        element: (
          <SuspenseWrapper>
            <YearlyPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/company/:partnerId",
        element: (
          <SuspenseWrapper>
            <CompanyFilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/payouts/monthly/company/:startDate/:endDate/:partnerId",
        element: (
          <SuspenseWrapper>
            <MonthlyCompanyFilterPayOut />
          </SuspenseWrapper>
        ),
      },
      {
        path: "year_netPremium",
        element: (
          <SuspenseWrapper>
            <YearlyNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "year_final_netPremium",
        element: (
          <SuspenseWrapper>
            <YearlyFinalNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "month_netPremium",
        element: (
          <SuspenseWrapper>
            <MonthlyNetPremium />
          </SuspenseWrapper>
        ),
      },
      {
        path: "month_final_premium",
        element: (
          <SuspenseWrapper>
            <MonthlyFinalNetPremium />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "account",
    children: [
      {
        path: "money-transfer",
        element: (
          <SuspenseWrapper>
            {" "}
            <TransferMoney />
          </SuspenseWrapper>
        ),
      },
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Accounts />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/partner-debit",
        element: (
          <SuspenseWrapper>
            <PartnerDebit />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/broker-credit",
        element: (
          <SuspenseWrapper>
            <BrokerCredit />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/broker-payment-compare",
        element: (
          <SuspenseWrapper>
            <CompareBrokerPayment />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/partner-payment-compare",
        element: (
          <SuspenseWrapper>
            <ComparePartnerPayment />
          </SuspenseWrapper>
        ),
      },
      {
        path: "creditdebit",
        element: (
          <SuspenseWrapper>
            <CreditDebits />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/creditdebit/broker-payment/view",
        element: (
          <SuspenseWrapper>
            <ViewCreditDebitByBrokerCard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/creditdebit/partner-payment/view",
        element: (
          <SuspenseWrapper>
            <ViewCreditDebitByPartnerCard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/creditdebit/:accountId/view",
        element: (
          <SuspenseWrapper>
            <ViewAccountCreditDebitsDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/creditdebit/add",
        element: (
          <SuspenseWrapper>
            <AddCreditDebits />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/creditdebit/:creditDebitId/edit",
        element: (
          <SuspenseWrapper>
            <AddCreditDebits />
          </SuspenseWrapper>
        ),
      },
      {
        path: "tds-payin",
        element: (
          <SuspenseWrapper>
            <TdsPayInManage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "tds-payout",
        element: (
          <SuspenseWrapper>
            <TdsPayOutManage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddAccounts />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/:accountId/edit",
        element: (
          <SuspenseWrapper>
            <AddAccounts />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/broker/update-payment",
        element: (
          <SuspenseWrapper>
            <UpdatePayment />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/partner/update-payment",
        element: (
          <SuspenseWrapper>
            <ManagePartnerPayment />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/excel-payIn",
        element: (
          <SuspenseWrapper>
            <ExcelPayIn />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/account/excel-payOut",
        element: (
          <SuspenseWrapper>
            <ExcelPayout />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "booking",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <BookingRequests />
          </SuspenseWrapper>
        ),
      },
      {
        path: "new",
        element: (
          <SuspenseWrapper>
            <NewBookingRequests />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddBookingRequest />
          </SuspenseWrapper>
        ),
      },
      {
        path: "accepted",
        element: (
          <SuspenseWrapper>
            <AcceptedBooking />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/booking/:leadId/new",
        element: (
          <SuspenseWrapper>
            <AddBookingRequest />
          </SuspenseWrapper>
        ),
      },
      {
        path: "all",
        element: (
          <SuspenseWrapper>
            <AllBookingReq />
          </SuspenseWrapper>
        ),
      },
      {
        path: "booked",
        element: (
          <SuspenseWrapper>
            {" "}
            <BookedBooking />
          </SuspenseWrapper>
        ),
      },
      {
        path: "reject",
        element: <SuspenseWrapper> <RejectionPolicies /></SuspenseWrapper>,
      },
      {
        path: "publish",
        element: (
          <SuspenseWrapper>
            <PublishedPolicyPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "policytype",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <PolicyTypes />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddPolicyType />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policytype/:policyTypeId/edit",
        element: (
          <SuspenseWrapper>
            <AddPolicyType />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "policy",
    children: [
      {
        path: "/policy/renewals",
        element: (
          <SuspenseWrapper>
            <GetRenewals />
          </SuspenseWrapper>
        ),
      },
      {
        path: "disputed-policies",
        element: (
          <SuspenseWrapper>
            <DisputedPolicyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/motor/upload",
        element: (
          <SuspenseWrapper>
            <PolicyPDF />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/motor/excel/upload",
        element: (
          <SuspenseWrapper>
            <UploadPolicy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/motor/add",
        element: (
          <SuspenseWrapper>
            <AddMotorPolicy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/policy-dispute",
        element: (
          <SuspenseWrapper>
            <PolicyDispute />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/motor/:bookingRequestId",
        element: (
          <SuspenseWrapper>
            <EditMotorPolicy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/:policyId/view",
        element: (
          <SuspenseWrapper>
            <ViewPolicy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/:policyId",
        element: (
          <SuspenseWrapper>
            <ViewPolicyDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/:policyId/edit",
        element: (
          <SuspenseWrapper>
            <AddMotorPolicy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/policy/:policyId/commission",
        element: (
          <SuspenseWrapper>
            <EditCommission />
          </SuspenseWrapper>
        ),
      },
      {
        path: "motor-policies",
        element: (
          <SuspenseWrapper>
            <GetMotorPolicies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "archive",
        element: (
          <SuspenseWrapper>
            <GetArchiveMotorPolicies />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "ranks",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Ranks />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddRank />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/ranks/:rankId/edit",
        element: (
          <SuspenseWrapper>
            <AddRank />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "team",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Teams />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddTeam />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/team/:teamId/edit",
        element: (
          <SuspenseWrapper>
            <AddTeam />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "subproducts",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <ProductSubTypes />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddProductSubType />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/subproducts/:productSubTypeId/edit",
        element: (
          <SuspenseWrapper>
            <AddProductSubType />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/subproducts/add/:productId",
        element: (
          <SuspenseWrapper>
            <AddProductSubType />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "casetype",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <CaseTypes />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddCaseType />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/casetype/:caseTypeId/edit",
        element: (
          <SuspenseWrapper>
            <AddCaseType />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "fueltype",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <FuelTypes />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddFuelType />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/fueltype/:fuelTypeId/edit",
        element: (
          <SuspenseWrapper>
            <AddFuelType />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "commision",
    children: [
      {
        path: "payout",
        element: (
          <SuspenseWrapper>
            <PayOutUploadByExcel />
          </SuspenseWrapper>
        ),
      },
      {
        path: "payin",
        element: (
          <SuspenseWrapper>
            <PayInUploadByExcel />
          </SuspenseWrapper>
        ),
      },
      {
        path: "percentage",
        element: (
          <SuspenseWrapper>
            <Percentage />
          </SuspenseWrapper>
        ),
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
        element: (
          <SuspenseWrapper>
            <Products />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddProduct />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/products/:productId/edit",
        element: (
          <SuspenseWrapper>
            <AddProduct />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "companies",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Companies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddCompany />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/companies/:companyId/edit",
        element: (
          <SuspenseWrapper>
            <AddCompany />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "brokers",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Brokers />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddBroker />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/brokers/:brokerId/edit",
        element: (
          <SuspenseWrapper>
            <AddBroker />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "branch",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Branches />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddBranch />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/branch/:branchId/edit",
        element: (
          <SuspenseWrapper>
            <AddBranch />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "categories",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Categories />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddCategory />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/categories/:categoryId/edit",
        element: (
          <SuspenseWrapper>
            <AddCategory />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "models",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Models />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddModel />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/models/:modelId/edit",
        element: (
          <SuspenseWrapper>
            <AddModel />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "makes",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Makes />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add",
        element: (
          <SuspenseWrapper>
            <AddMake />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/makes/:makeId/edit",
        element: (
          <SuspenseWrapper>
            <AddMake />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "accountdashboard",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <AccountDashboard />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "operationdashboard",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <OperationDashboard />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "/withdrawal",
    element: (
      <SuspenseWrapper>
        <ManageCards />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/withdrawal/:partnerId",
    element: (
      <SuspenseWrapper>
        <ManageCards />
      </SuspenseWrapper>
    ),
  },
  {
    path: "wallet",
    children: [
      {
        path: "broker",
        element: (
          <SuspenseWrapper>
            <BrokerWallet />
          </SuspenseWrapper>
        ),
      },
      {
        path: "payin-transaction",
        element: (
          <SuspenseWrapper>
            <BrokerPoliciesTransaction />
          </SuspenseWrapper>
        ),
      },
      {
        path: "payout-transaction",
        element: (
          <SuspenseWrapper>
            <PartnerPolicyTransactions />
          </SuspenseWrapper>
        ),
      },
      {
        path: "partner",
        element: (
          <SuspenseWrapper>
            <PartnerWallet />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  {
    path: "partnerdashboard",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <PartnerDashboard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/partnerdashboard/card",
        element: (
          <SuspenseWrapper>
            <ViewCardHistory />
          </SuspenseWrapper>
        ),
      },

      {
        path: "/partnerdashboard/:transactionCode/:partnerId/:startDate/:endDate/card-history",
        element: (
          <SuspenseWrapper>
            <ViewCardHistory />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "rm",
    children: [
      {
        path: "dashboard",
        element: (
          <SuspenseWrapper>
            <RMDashboard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "rm_polices",
        element: (
          <SuspenseWrapper>
            <RMGetMotorPolicies />
          </SuspenseWrapper>
        ),
      },
      {
        path: "rm_team",
        element: (
          <SuspenseWrapper>
            <RmTeams />
          </SuspenseWrapper>
        ),
      },
      {
        path: "lead",
        element: (
          <SuspenseWrapper>
            <RmLead />
          </SuspenseWrapper>
        ),
      },
      {
        path: "requested",
        element: (
          <SuspenseWrapper>
            <RmRequestedBooking />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  {
    path: "bookingdashboard",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <BookingDashboard />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "403",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Page403 />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "filter",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Filter />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "notification",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Notification />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "non-motor",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <ComingSoonHealth />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "life",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <ComingSoonHealth />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "health",
    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <ComingSoonHealth />
          </SuspenseWrapper>
        ),
      },
      {
        path: "policy",
        element: (
          <SuspenseWrapper>
             <AddHealthPolicy />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "hr",
    children: [
      {
        path: "dashboard",
        element: (
          <SuspenseWrapper>
            <HrDashBoard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "holidays",
        element: (
          <SuspenseWrapper>
            <HolidayList />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add-holiday",
        element: (
          <SuspenseWrapper>
            <AddHoliday />
          </SuspenseWrapper>
        ),
      },
      {
        path: `edit-holiday/:holidayId`,
        element: (
          <SuspenseWrapper>
            <AddHoliday />
          </SuspenseWrapper>
        ),
      },
      {
        path: `attendance`,
        element: (
          <SuspenseWrapper>
            <Attendance />
          </SuspenseWrapper>
        ),
      },
      {
        path: `attendance/:employeeId`,
        element: (
          <SuspenseWrapper>
            <EmployeeAttendance />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add-attendance",
        element: (
          <SuspenseWrapper>
            <AddAttendance />
          </SuspenseWrapper>
        ),
      },
      {
        path: `/hr/edit-attendance/:id`,
        element: (
          <SuspenseWrapper>
            <AddAttendance />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "mark-attendance",
    element: (
      <SuspenseWrapper>
        <MarkAttendance />
      </SuspenseWrapper>
    ),
  },
  {
    path: "it/dashboard",
    element: (
      <SuspenseWrapper>
        <ITDashboard />
      </SuspenseWrapper>
    ),
  },
];
export default routes;
