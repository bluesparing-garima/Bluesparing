export interface INotification {
    _id?: string;
    title?: string;
    type: string;
    role: string;
    notificationFor: string;
    notificationBy: string;
    isView: boolean;
    isActive: boolean;
    createdBy?: string;
    createdOn?: string;
    __v?: number;
}