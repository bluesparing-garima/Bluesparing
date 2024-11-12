// Roles
export const rolesPath = () => `/role`;
export const rolesAddPath = () => `/role/add`;
export const roleEditPath = (roleId: string) => `/role/${roleId}/edit`;
//Products
export const productPath = () => "/products";
export const productAddPath = () => "/products/add";
export const productEditPath = (productId: string) =>
  `/products/${productId}/edit`;
//Makes
export const makePath = () => "/makes";
export const makeAddPath = () => "/makes/add";
export const makeEditPath = (makeId: string) => `/makes/${makeId}/edit`;
//MOdels
export const modelPath = () => "/models";
export const modelAddPath = () => "/models/add";
export const modelEditPath = (modelId: string) => `/models/${modelId}/edit`;
//Company
export const companyPath = () => "/companies";
export const companyAddPath = () => "/companies/add";
export const companyEditPath = (companyId: string) =>
  `/companies/${companyId}/edit`;

//Broker
export const brokerPath = () => "/brokers";
export const brokerAddPath = () => "/brokers/add";
export const brokerEditPath = (brokerId: string) => `/brokers/${brokerId}/edit`;
//Rank
export const rankPath = () => "/ranks";
export const rankAddPath = () => "/ranks/add";
export const rankEditPath = (rankId: string) => `/ranks/${rankId}/edit`;
//Branch
export const branchPath = () => "/branch";
export const branchAddPath = () => "/branch/add";
export const branchEditPath = (branchId: string) => `/branch/${branchId}/edit`;
// PolicyTypes
export const policyTypePath = () => `/policytype`;
export const policyTypeAddPath = () => `/policytype/add`;
export const policyTypeEditPath = (policyTypeId: string) =>
  `/policytype/${policyTypeId}/edit`;

// CaseTypes
export const caseTypesPath = () => `/caseType`;
export const caseTypesAddPath = () => `/caseType/add`;
export const caseTypesEditPath = (caseTypeId: string) =>
  `/caseType/${caseTypeId}/edit`;

// FuelTypes
export const fuelTypesPath = () => `/fuelType`;
export const fuelTypesAddPath = () => `/fuelType/add`;
export const fuelTypesEditPath = (fuelTypeId: string) =>
  `/fuelType/${fuelTypeId}/edit`;

// Product Types
export const productSubTypesPath = () => `/subproducts`;
export const productSubTypesDirectAddPath = (productId: string) =>
  `/subproducts/add/${productId}`;
export const productSubTypesAddPath = () => `/subproducts/add`;
export const productSubTypeEditPath = (productSubTypeId: string) =>
  `/subproducts/${productSubTypeId}/edit`;

//Policies
export const motorPolicyAddPath = () => `/policy/motor/add`;
export const motorPolicyViewPath = (policyId: string) =>
  `/policy/${policyId}/view`;
export const motorPolicyViewDetailsPath = (policyId: string) =>
  `/policy/${policyId}`;
export const motorPolicyEditCommissionPath = (policyId: string) =>
  `/policy/${policyId}/commission`;
export const motorPolicyEditPath = (policyId: string) =>
  `/policy/${policyId}/edit`;
export const motorPolicyPath = () => `/policy/motorpolicies`;
export const motorPolicyCreatePath = (bookingRequestId: string) =>
  `/policy/motor/${bookingRequestId}`;

export const calculatePayInPolicyPath = () => `/policy/filter`;
export const policyFilterByDatePolicyPath = () => `/policy/filter-date`;
// Product Types
export const categoryPath = () => `/category`;
export const categoryAddPath = () => `/categories/add`;
export const categoryEditPath = (categoryId: string) =>
  `/categories/${categoryId}/edit`;

// Team Types
export const teamPath = () => `/team`;
export const teamAddPath = () => `/team/add`;
export const teamEditPath = (teamId: string) => `/team/${teamId}/edit`;
//booking Request
export const bookingRequestsPath = () => `/booking`;
export const bookingRequestsAddPath = () => `/booking/add`;
export const bookingRequestsRejectPath = () => `/booking/reject`;
export const bookingRequestEditPath = (bookingRequestId: string) =>
  `/booking/${bookingRequestId}/edit`;
export const bookingRequestNewPath = (bookingRequestId: string) =>
  `/booking/${bookingRequestId}/new`;
//Lead
export const leadsPath = () => `/lead`;
export const leadsAddPath = () => `/lead/add`;
export const leadEditPath = (leadId: string) => `/lead/${leadId}/edit`;
export const QuotationAddPath = (leadId: string) => `/lead/${leadId}/quotation`;
export const QuotationViewPath = (leadId: string) =>
  `/lead/${leadId}/quotation/view`;
// Accounts
export const accountsPath = () => `/account`;
export const accountCreditDebitViewPath = (accountId: string) =>
  `/account/creditdebit/${accountId}/view`;
export const accountsExcelComparePath = () => `/account/broker-payment-compare`;
export const accountsAddPath = () => `/account/add`;
export const accountsBrokerPaymentPath = () => `/account/broker/update-payment`;
export const accountsPartnerPaymentPath = () =>
  `/account/partner/update-payment`;
export const accountEditPath = (accountId: string) =>
  `/account/${accountId}/edit`;
// Credit debit
export const creditDebitsPath = () => `/account/creditdebit`;
export const creditDebitsAddPath = () => `/account/creditdebit/add`;
export const partnerDebitsPath = () => `/account/partner-debit`;
export const creditDebitEditPath = (creditDebitId: string) =>
  `/account/creditdebit/${creditDebitId}/edit`;

export const cardHistoryPath = (
  transactionCode: string,
  startDate: string,
  endDate: string,
  partnerId: string
) =>
  `/partnerdashboard/${transactionCode}/${partnerId}/${startDate}/${endDate}/card-history`;

export const notificationPath = () => "/notification";
export const walletPath = (partnerId: string) =>
  `/partnerdashboard/withdrawal/${partnerId}`;
export const payoutsPath = () => "/payouts";
export const payoutMonthlyPath = () => "/payouts/monthly";
export const payinsPath = () => "/payins";
export const payinMonthlyPath = () => "/payins/monthly";
export const payOutMonthlyCompantPath = (
  startDate: string,
  endDate: string,
  partnerId: string
) => `/payouts/monthly/company/${startDate}/${endDate}/${partnerId}`;

//blogcate
export const blogCategoryPath = () => `/website/blogcategories`;
export const blogCategoryAddPath = () => `/website/blogcategory/add`;
export const blogCategoryEditPath = (categoryId: string) =>
  `/website/blogcategory/${categoryId}/edit`;

//blogcate
export const blogPath = () => `/website/blogs`;
export const blogAddPath = () => `/website/blogs/add`;
export const blogEditPath = (blogId: string) => `/website/blogs/${blogId}/edit`;

//blogcate
export const newsCategoryPath = () => `/website/newscategories`;
export const newsCategoryAddPath = () => `/website/newscategory/add`;
export const newsCategoryEditPath = (categoryId: string) =>
  `/website/newscategory/${categoryId}/edit`;

//newscate
export const newsPath = () => `/website/news`;
export const newsAddPath = () => `/website/news/add`;
export const newsEditPath = (newsId: string) => `/website/news/${newsId}/edit`;
