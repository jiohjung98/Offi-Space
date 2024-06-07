import { NotificationType } from '@/api/types/notification';
import CalculateTime from '@/utils/calculateTime';
import Link from 'next/link';

export const NotificationLayout = ({ notice }: { notice: NotificationType }) => {
  return (
    <Link href={notice.targetUrl}>
      <div
        key={notice?.notificationId}
        className="flex flex-row  justify-start items-center mt-[16px] mb-[36px] relative">
        <img src="/Notification-Check.svg" className="mr-[14px]" />

        <div className="flex flex-col justify-start items-start">
          <div className="text-base font-medium text-black mb-[6px]">{notice?.title}</div>
          <div className="text-xs font-medium text-neutral-600  flex-grow">
            {notice?.content}
          </div>
        </div>
        <div
          className="min-w-[60px] w-auto  pl-[20px] pb-[35px] text-xs font-normal text-neutral-400 absolute
         top-0 right-2
      ">
          {CalculateTime(notice?.date)}
        </div>
      </div>
    </Link>
  );
};
