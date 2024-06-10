import { NotificationType } from '@/api/types/notification';
import CalculateTime from '@/utils/calculateTime';
import Link from 'next/link';

export const NotificationCommunityLayout = ({ notice }: { notice: NotificationType }) => {
  console.log(notice);
  return (
    <Link href={`community/${notice?.targetId}`}>
      <div
        key={notice?.notificationId}
        className="flex flex-row  justify-start items-center mt-[16px] mb-[36px] relative">
        <img src="/Notification-Check.svg" className="mr-[14px]" />

        <div className="flex flex-col justify-start items-start">
          <div className=" w-[250px] text-xs font-medium text-neutral-600  flex-grow">
            {notice?.content}
          </div>
        </div>
        <div
          className="min-w-[50px] w-auto pl-[20px] pb-[35px]] text-xs font-normal text-neutral-400 absolute
         top-0 right-2 ">
          {CalculateTime(notice?.date)}
        </div>
      </div>
    </Link>
  );
};
