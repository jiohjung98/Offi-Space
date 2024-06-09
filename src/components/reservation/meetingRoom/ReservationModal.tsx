import React from 'react';
import { ReservationModalProps } from '@/api/types/reserve';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ReservationModal: React.FC<ReservationModalProps> = ({
  isVisible,
  eventName,
  getTimes,
  selectedBranch,
  meetingRoomName
}) => {
  const router = useRouter();

  if (!isVisible) return null;

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className="w-[310px] h-[417px] flex flex-col pt-[40px] bg-white rounded-2xl shadow-lg text-center">
        <div className="w-full px-8">
          <Image
            src={'/reservation/reserveAlert.svg'}
            width={42}
            height={42}
            alt="calendar"
            className="mx-auto"
          />
        </div>
        <div className="text-center text-neutral-800 text-lg font-bold font-['Pretendard'] leading-normal mt-[15px] px-8">
          예약이 완료되었습니다!
        </div>
        <div className="text-left mt-[60px] flex-grow px-8">
          <div className="flex justify-between mb-2">
            <p className="text-neutral-600 text-base font-normal font-['Pretendard']">
              일정명
            </p>
            <p className="text-right text-indigo-700 text-base font-medium font-['Pretendard']">
              {eventName}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-neutral-600 text-base font-normal font-['Pretendard']">
              예약 시간
            </p>
            <p className="text-right text-indigo-700 text-base font-medium font-['Pretendard']">
              {getTimes}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-neutral-600 text-base font-normal font-['Pretendard']">
              예약한 지점
            </p>
            <p className="text-right text-indigo-700 text-base font-medium font-['Pretendard']">
              {selectedBranch}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-neutral-600 text-base font-normal font-['Pretendard']">
              예약한 공간
            </p>
            <p className="text-right text-indigo-700 text-base font-medium font-['Pretendard']">
              {meetingRoomName}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-neutral-200">
          <button
            className="flex-1 text-center text-stone-500 text-lg font-normal font-['Pretendard'] leading-normal py-4"
            onClick={handleGoHome}>
            홈으로
          </button>
          <div className="w-0.5 h-full bg-neutral-200"></div>
          <button
            onClick={() => router.replace('/reservation/myreservationlist')}
            className="flex-1 text-center text-indigo-700 text-lg font-semibold font-['Pretendard'] leading-normal py-4">
            예약 상세
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
