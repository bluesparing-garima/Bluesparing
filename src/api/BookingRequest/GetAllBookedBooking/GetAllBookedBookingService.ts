import GetAllBookedBookingAPI from "./GetAllBookedBookingAPI";
const GetAllBookedBookingService = async (): Promise<any> => {
    try {
        const res = await GetAllBookedBookingAPI()
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetAllBookedBookingService;