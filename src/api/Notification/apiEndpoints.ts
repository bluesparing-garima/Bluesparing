export const getNotificationByRoleEndpoint = (role: string[], type?: string, isView?: boolean) => {
    let url = `/api/notification?role=`
    role.forEach(element => {
        url += element + ',';
    });
    url = url.slice(0, -1);
    if (type) {
        url = url + `&type=${type}`
    }
    if (isView === false) {
        url = url + `&isView=${isView}`
    }
    return url;
}

export const editNotificationViewEndpoint = (notificationId: string) =>
    (`/api/notification/view/${notificationId}`);