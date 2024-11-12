import { Header } from "../../Auth/IAuth";
import { IBookingRequests } from "../../components/Booking/IBookingRequests";

export interface AddEditBookingRequestProps {
  header: Header;
  bookingRequest: any;
}
export interface AcceptBookingRequestProps {
  header: Header;
  bookingRequest: any;
  bookingId: string;
}
export interface EditBookingRequestProps {
  header: Header;
  bookingRequest: any;
  bookingId: string;
}
export interface GetBookingRequestProps {
  header?: Header;
  rmId?:string
  signal?: AbortSignal
}
export interface GetBookingRequestPartnerProps {
  header?: Header;
  partnerId:string
}
export interface GetBookingRequestByPartnerIdProps {
  header?: Header;
  partnerId: string;
}
export interface GetBookingRequestByOperationIdProps {
  header?: Header;
  userId: string;
}
export interface GetBookingRequestByIdProps {
  header?: Header;
  bookingRequestId: string;
}
export interface ValidateBookingRequestProps {
  header?: Header;
  policyNumber: string;
}
export interface GetBookingRequestDetailsProps {
  header?: Header;
  bookingRequestId?: string;
}

export interface DeleteBookingRequestProps {
  header?: Header;
  bookingRequestId?: string;
  bookingRequestes: IBookingRequests[];
}
