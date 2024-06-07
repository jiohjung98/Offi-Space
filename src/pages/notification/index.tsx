import { communitygetmock } from '@/api/mock.api';
import { BackArrow } from '@/components/backarrow/BackArrow';
import Footer from '@/components/footer/Footer';
import CalculateTime from '@/utils/calculateTime';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import useNoticeGet from '@/components/community/hooks/useNoticeGet';
import { NotificationType } from '@/api/types/notification';
import { NotificationLayout } from '@/components/notification/NotificationLayout';
import Loader from '@/components/community/shared/Loader';
const ResoulvationForm = () => {
  const { allPosts, isFetching, isFetchingNextPage, hasNextPage, ref } =
    useNoticeGet('createdAt');

  //
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {allPosts?.map((notice: NotificationType, i: number) => (
        <Fragment key={notice?.notificationId}>
          <NotificationLayout notice={notice} />
          {i < allPosts?.length - 1 && <div className="w-full h-[2px] bg-gray-50" />}
        </Fragment>
      ))}
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none" ref={ref} />
    </div>
  );
};

const CommunityForm = () => {
  const { data: community, isLoading } = useQuery({
    queryKey: ['community'],
    queryFn: communitygetmock
  });

  const communityData = community?.data.value.data;
  console.log(community);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        communityData?.length === 0 && (
          <div className=" w-full h-[400px] flex flex-col justify-center items-center">
            <img className="mb-[16px]" src="/mypage/inquiry/Warning.svg" />
            <div className="text-neutral-400 text-base font-normal font-['Pretendard'] leading-snug">
              문의 내역이 없습니다.
            </div>
          </div>
        )
      )}

      {communityData?.map((data: { nickname: string; time: string }, index: number) => (
        <div
          key={index}
          className="flex flex-row  justify-start items-center mt-[16px] border-b mb-[30px] border-stone-50">
          <img src="/Notification-Check.svg" className="mr-[14px]" />

          <div className="flex flex-col justify-start items-start">
            <div className="text-xs font-medium text-neutral-600  flex-grow">
              {data.nickname}님이 회원님의 게시물에 댓글을 남겼습니다.
            </div>
          </div>
          <div className="min-w-[50px] w-auto  ml-[20px] mb-[15px] text-xs font-normal text-neutral-400 ">
            {CalculateTime(data.time)}
          </div>
        </div>
      ))}
    </div>
  );
};

const Notification = () => {
  const [view, setView] = useState('resoulvation');

  return (
    <div className=" max-w-[393px]  mx-auto relative">
      <Footer />
      <div className="mt-[20px] ml-[10px] ">
        <BackArrow width="40px" height="24px" name="알림" link="/" />
      </div>
      <div className="w-full h-[900px] bg-white flex flex-col justify-between items-center">
        <div className="w-full flex justify-center items-center border-b border-neutral-200 mt-[13px]">
          <button
            className={`w-[164px] px-6 py-2 ${view === 'resoulvation' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
            onClick={() => setView('resoulvation')}>
            예약
          </button>
          <button
            className={`w-[164px] px-6 py-2 ${view === 'community' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
            onClick={() => setView('community')}>
            커뮤니티
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-auto">
          {view === 'resoulvation' ? <ResoulvationForm /> : <CommunityForm />}
        </div>
      </div>
    </div>
  );
};

export default Notification;
