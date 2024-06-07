// import { ICommon } from '../types/common';
import { getRequest } from '../request';
import { NotificationList } from '../types/notification';

/* 알림 조회*/

export const noticeInfo = async (type: string, cursorId?: string) => {
  let url = `notification`;
  const params = [];

  if (type && type === 'RESERVATION') {
    params.push(`type=RESERVATION`);
  } else if (type && type === 'COMMUNITY') {
    params.push(`type=COMMUNITY`);
  }

  if (cursorId !== '0') {
    params.push(`cursorId=${cursorId}`);
  }

  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  const response = await getRequest<NotificationList>(url);
  const lastVisible =
    response?.data?.content[response?.data?.content.length - 1].notificationId;
  return {
    content: response?.data?.content,
    lastVisible,
    hasNext: response?.data?.hasNext
  };
};
