import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { holidaysAddEndpoint as endpoint } from "../../ApiEndpoints";
import { IAddHolidayPayload } from "../../getHrTypes";

const AddHolidayAPI = async ({ header, holidayData }: IAddHolidayPayload) => {
    const url = endpoint()
    const options: FetchOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            ...holidayData,
        }),
    }

    return fetchInterceptor(url, options)

};

export default AddHolidayAPI;