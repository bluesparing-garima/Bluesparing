export interface updateNotificationPros {
  header?: any;

}

export interface getNotificationProps {
  header?: any;
}
export interface getNotificationByRoleProps {
  header?: any;
  role: string[];
  type?: string;
  isView?: boolean;
}

export interface updateNotificationViewProps {
  header?: any;
  notificationId: string;

}