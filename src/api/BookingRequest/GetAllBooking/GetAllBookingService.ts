import GetAllBookingAPI from "./GetAllBookingAPI";
const GetAllBookingService = async (): Promise<any> => {
    try {
        const res = await GetAllBookingAPI()
        return res;
    } catch (error) {
        throw error;
    }

};

export default GetAllBookingService;