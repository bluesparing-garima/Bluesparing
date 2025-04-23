import GetOccupancyApi from "./GetOccupancyApi";
const GetOccupancyServices = async (): Promise<any> => {
    try {
        const res = await GetOccupancyApi()
        return res
    } catch (error) {
        throw error
    }

};
export default GetOccupancyServices;
