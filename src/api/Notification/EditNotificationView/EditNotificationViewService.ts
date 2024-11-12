import { updateNotificationViewProps } from "../getNotificationTypes";
import EditNotificationViewAPI from "./EditNotificationViewAPI";

const EditNotificationViewService = async ({ header, notificationId }: updateNotificationViewProps): Promise<any> => {
    try {
        const res = await EditNotificationViewAPI({
            header: header, notificationId
        })
        return res
    } catch (error) {
        throw error
    }

};

export default EditNotificationViewService;