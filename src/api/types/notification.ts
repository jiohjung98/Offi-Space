import { ICommon } from './common';

export interface NotificationType {
  notificationId: string;
  title: string;
  content: string;
  targetUrl: string;
  date: string;
}

interface NotificationListType {
  content: NotificationType[];
  hasNext: boolean;
}

export type NotificationList = ICommon<NotificationListType>;
