import { GetBookingRequestProps } from "../getBookingRequestTypes";
import GetBookingRequestByAdminAPI from "./GetBookingRequestByAdminAPI";

const GetBookingRequestByAdminService = async ({ header }: GetBookingRequestProps): Promise<any> => {
    try {
        const res = await GetBookingRequestByAdminAPI({
            header: header,
        })
        return res;
    } catch (error) {
        throw error;}

};

export default GetBookingRequestByAdminService;