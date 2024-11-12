import { IDeleteHolidaysPayload } from "../../getHrTypes"
import { attendanceDeleteEndpoint as endpoint } from "../../ApiEndpoints";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
const DeleteHolidayAPI = ({ header, id }: IDeleteHolidaysPayload) => {
    const url = endpoint(id)
    const options: FetchOptions = {
        method: "DELETE",
        headers: header,

    }

    return fetchInterceptor(url, options)
}
export default DeleteHolidayAPI