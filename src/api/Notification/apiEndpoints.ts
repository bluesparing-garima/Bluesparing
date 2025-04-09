export const getNotificationByRoleEndpoint = (role: string,id:string) => {
    let url = `/api/notification?role=`
    url += role + ',';
    url = url.slice(0, -1);
    url = url + `&id=${id}`
    return url;
}

export const editNotificationViewEndpoint = (notificationId: string) =>
    (`/api/notification/view/${notificationId}`);