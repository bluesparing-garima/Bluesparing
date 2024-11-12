import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { holidayEditEndpoint as endpoint } from "../../ApiEndpoints";
import { IAddHolidayPayload } from "../../getHrTypes";

const EditHolidayAPI = async ({ header, holidayData ,id}: IAddHolidayPayload) => {
    const url = endpoint(id!)
    const options: FetchOptions = {
        method: "PUT",
        headers: header,
        body: JSON.stringify({
            ...holidayData,
        }),
    }

    return fetchInterceptor(url, options)

};

export default EditHolidayAPI;