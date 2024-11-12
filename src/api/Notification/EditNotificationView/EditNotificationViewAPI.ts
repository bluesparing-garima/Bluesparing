import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { updateNotificationViewProps } from "../getNotificationTypes";
import { editNotificationViewEndpoint as endpoint } from "../apiEndpoints";


const EditNotificationViewAPI = async ({ header, notificationId }: updateNotificationViewProps) => {
    const url = endpoint(notificationId)
    const options: FetchOptions = {
        method: "PUT",
        headers: header,
        body: JSON.stringify({
            isView: true
        }),

    }
    return fetchInterceptor(url, options)

};

export default EditNotificationViewAPI;
