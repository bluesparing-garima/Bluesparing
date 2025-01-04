
export const addBookingRequestEndpoint = () =>
  (`/api/booking-request`);
export const getBookingRequestByIdEndpoint = (bookingRequestId: string) =>
(
  `/api/booking-request/booking-id/${bookingRequestId}`
);
export const editBookingRequestEndpoint = (bookingRequestId: string) =>
  (`/api/booking-request/${bookingRequestId}`);
export const getBookingRequestEndpoint = () =>
  (`/api/booking-request`);

export const getBookingRequestAdminEndpoint = () =>
  (`/api/booking-request/accepted-bookings`);
export const validateBookingRequestEndpoint = (policyNumber: string) =>
(
  `/api/booking-request/validatePolicyNumber?policyNumber=${policyNumber}`
);
export const getBookingRequestByOperationIdEndpoint = (userId: string) =>
  (`/api/booking-request/created-by/${userId}`);

export const getBookingRequestbyPartnerIdEndpoint = (partnerId: string) =>
  (`/api/booking-request/partner/${partnerId}`);

export const acceptBookingRequest = (bookingId: string) =>
(
  `/api/booking-request/accepted-booking/${bookingId}`
);

export const getBookingRequestbyBookingIdEndpoint = (userId: string) =>
  (`/api/booking-request/accepted-by/${userId}`);

export const getRejectedBookingReqEndpoint = () => {
  return ((`/api/booking-request/rejected-bookings`))

}
export const rejectedBookingPartnerEndpoint = (partnerId: string) => {
  return ((`/api/booking-request/rejected-partner-id?partnerId=${partnerId}`))
}
export const RmRequestedBookingEndPoint = (rmId: string) =>
  (`/api/booking-request/relationship-manager?relationshipManagerId=${rmId}`);

export const RmLeadEndpoint = (rmId: string) =>
  (`/api/lead-generate/relationship-manager?relationshipManagerId=${rmId}`);