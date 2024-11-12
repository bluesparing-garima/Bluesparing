
import { GetBookingRequestPartnerProps } from "../getBookingRequestTypes";
import RejectedBookingPartnerAPI from './RejectedBookingPartnerAPI'
const RejectedBookingPartnerService = async ({ header,partnerId }: GetBookingRequestPartnerProps):Promise<any> => {
    try {
     const res = await  RejectedBookingPartnerAPI({
        header: header,partnerId
    })
    return res;
    } catch (error) {
     throw error
    }

};

export default RejectedBookingPartnerService;