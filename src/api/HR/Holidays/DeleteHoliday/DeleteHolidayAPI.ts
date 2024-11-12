import { IDeleteHolidaysPayload } from "../../getHrTypes"
import { holidayDeleteEndpoint as endpoint } from "../../ApiEndpoints";
import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
const DeleteAttendanceAPI = ({ header, id }: IDeleteHolidaysPayload) => {
    const url = endpoint(id)
    const options: FetchOptions = {
        method: "DELETE",
        headers: header,

    }

    return fetchInterceptor(url, options)
}
export default DeleteAttendanceAPI