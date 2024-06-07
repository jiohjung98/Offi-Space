import { BackArrow } from '@/components/backarrow/BackArrow';
import Footer from '@/components/footer/Footer';
import { Fragment } from 'react';
import useNoticeGet from '@/components/community/hooks/useNoticeGet';
import { NotificationType } from '@/api/types/notification';
import { NotificationLayout } from '@/components/notification/NotificationLayout';
import Loader from '@/components/community/shared/Loader';
import { NotificationCommunityLayout } from '@/components/notification/NoticeCommunityLayout';
import {
  useNotificationCategory,
  useSetNotificationCategory
} from '@/store/notifications.store';

const categorizeNotifications = (notifications: NotificationType[]) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const todayNotifications: NotificationType[] = [];
  const pastNotifications: NotificationType[] = [];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.date);

    if (isSameDay(notificationDate, today)) {
      todayNotifications.push(notification);
    } else {
      pastNotifications.push(notification);
    }
  });

  return { todayNotifications, pastNotifications };
};

const Notification = () => {
  const category = useNotificationCategory();
  const SetCategory = useSetNotificationCategory();
  const { allPosts, isFetching, isFetchingNextPage, hasNextPage, ref } =
    useNoticeGet(category);

  const { todayNotifications, pastNotifications } = categorizeNotifications(
    allPosts || []
  );

  return (
    <div className=" max-w-[393px]  mx-auto relative">
      <Footer />

      <div className="sticky  top-0 bg-white z-[10]">
        <div className="pt-[20px] ml-[10px]  ">
          <BackArrow width="40px" height="24px" name="알림" link="/" />
        </div>

        <div className="w-full  bg-white flex flex-col justify-between items-center">
          <div className="w-full flex justify-center items-center border-b border-neutral-200 mt-[6px]">
            <button
              className={`w-[164px] px-6 py-2 ${category === 'RESERVATION' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
              onClick={() => SetCategory('RESERVATION')}>
              예약
            </button>
            <button
              className={`w-[164px] px-6 py-2 ${category === 'COMMUNITY' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
              onClick={() => SetCategory('COMMUNITY')}>
              커뮤니티
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex-1 ">
          {category === 'RESERVATION' ? (
            <div className="w-full max-w-md mx-auto p-4">
              {allPosts?.map((notice: NotificationType) => (
                <Fragment key={notice.notificationId}>
                  <NotificationLayout notice={notice} />
                </Fragment>
              ))}
              {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
              <div className="mb-[100px]" />
              <div className="w-full touch-none" ref={ref} />
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto p-4">
              {todayNotifications.length > 0 && (
                <Fragment>
                  <h2 className=" font-bold ">오늘</h2>
                  {todayNotifications.map((notice: NotificationType) => (
                    <Fragment key={notice.notificationId}>
                      <NotificationCommunityLayout notice={notice} />
                    </Fragment>
                  ))}
                </Fragment>
              )}
              {pastNotifications.length > 0 && (
                <Fragment>
                  <h2 className=" font-bold mt-[20px] ">최근 7일</h2>
                  {pastNotifications.map((notice: NotificationType) => (
                    <Fragment key={notice.notificationId}>
                      <NotificationCommunityLayout notice={notice} />
                    </Fragment>
                  ))}
                </Fragment>
              )}
              {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
              <div className="mb-[100px]" />
              <div className="w-full touch-none" ref={ref} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;