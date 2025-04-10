export interface INotification {
    _id?: string;
    title?: string;
    role: [string];
    from: string;
    to: [string];
    isView: boolean;
    createdOn?: string;

}