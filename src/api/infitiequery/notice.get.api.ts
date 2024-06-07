// import { ICommon } from '../types/common';
import { getRequest } from '../request';
import { NotificationList } from '../types/notification';

/* 알림 조회*/

export const noticeInfo = async (pageNum: number, size: number, sortType: string) => {
  const response = await getRequest<NotificationList>(
    `notification?page=${pageNum}&size=${size}&sort=${sortType}`
  );
  const lastVisible =
    response?.data?.content[response?.data?.content.length - 1].notificationId;
  return {
    content: response?.data?.content,
    lastVisible,
    hasNext: response?.data?.hasNext
  };
};
