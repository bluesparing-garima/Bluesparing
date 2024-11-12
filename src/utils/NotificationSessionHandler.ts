import { INotification } from "../components/Notification/INotification";

export const storeNotifications = (key: string, notifications: INotification[]) => {
    try {
        const serializedData = JSON.stringify(notifications);
        localStorage.setItem(key, serializedData);
    } catch (error) {
        console.error("Error storing notifications:", error);
    }
};


export const getNotifications = (key: string): INotification[] => {
    try {
        const serializedData = localStorage.getItem(key);
        return serializedData ? JSON.parse(serializedData) : [];
    } catch (error) {
        console.error("Error retrieving notifications:", error);
        return [];
    }
};


export const updateNotification = (key: string, updatedNotification: INotification) => {
    const notifications = getNotifications(key);

    const updatedNotifications = notifications.map(notification =>
        notification._id === updatedNotification._id ? updatedNotification : notification
    );

    storeNotifications(key, updatedNotifications);
};