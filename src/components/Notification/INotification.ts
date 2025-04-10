export interface INotification {
    _id?: string;
    title?: string;
    type?:string;
    receiverRole: string;
    notificationSenderName: string;
    notificationReceiversIds: [string];
    isView: boolean;
    createdOn?: string;

}