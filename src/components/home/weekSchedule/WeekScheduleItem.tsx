import React from 'react';
import { useQuery } from 'react-query';
import { getDayReservationList } from '../remote/mainReservation';
import { format, parse } from 'date-fns';
import Image from 'next/image';
import { todayListData } from '@/components/reservation/model/myreservation';

const WeekScheduleItem = ({
  formattedSelectedDate
}: {
  formattedSelectedDate: string;
}) => {
  const { data } = useQuery(
    ['getDayReservation', formattedSelectedDate],
    () => getDayReservationList(formattedSelectedDate),
    {
      enabled: !!formattedSelectedDate
    }
  );

  if (!data) {
    return <div className="w-[361px] h-[121px] " />;
  }

  const renderTime = (dateString: string) => {
    const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm', new Date());
    const formattedTime = format(parsedDate, 'HH:mm');

    return formattedTime;
  };

  const renderUserImg = (images: string[]) => {
    if (images.length <= 3) {
      return (
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {images.map((userImg: string, i) => (
            <Image
              width={40}
              height={40}
              key={i}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={userImg}
              alt="userimg"
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {images.slice(0, 3).map((userImg: string, i) => (
            <Image
              key={i}
              width={40}
              height={40}
              className="w-10 h-10 border-2 border-white rounded-full"
              src={userImg}
              alt="userimg"
            />
          ))}
          <div className="relative">
            <Image
              width={40}
              height={40}
              className=" w-10 h-10 border-2 border-white rounded-full brightness-50 opacity-80 "
              src={images[3]}
              alt="userimg"
            />
            <div className="absolute z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              {' '}
              +{images.length - 3}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div>
      {data.length === 0 ? (
        <div className="py-12 border-b border-gray-200">
          <div className="text-gray-500 text-base font-medium flex items-center justify-center">
            예약된 일정이 없습니다.
          </div>
        </div>
      ) : (
        <>
          {data.slice(0, 3).map((item: todayListData, index: number) => {
            if (item.spaceType == 'MEETINGROOM') {
              return (
                <div key={index} className="border-b border-gray-300 pb-3 ">
                  <div className="mx-4 flex items-center justify-between">
                    {/* 고정 */}
                    <div className="flex gap-2 items-center">
                      <div className="w-[3px] h-[72px] bg-yellow-400" />
                      <div className="flex flex-col gap-2">
                        <div className="text-space-black text-md font-semibold">
                          {item?.reservationName}
                        </div>
                        <div className="flex flex-col text-sm font-normal text-gray-500">
                          <div>
                            {item?.branchName} {item?.spaceName} ({item?.spaceFloor}층)
                          </div>
                          <div>
                            {format(item?.startAt, 'HH:mm')} -{' '}
                            {format(item?.endAt, 'HH:mm')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[17px]">
                      <div className="flex justify-end">
                        {item?.memberType == 'REPRESENTATIVE' ? (
                          <div className="flex items-center justify-center w-[46px] h-6 text-center border-2 border-space-blue rounded-[20px] text-white bg-space-blue text-[12px] font-semibold">
                            호스트
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-[46px] h-6 text-center border-2 border-space-blue rounded-[20px] text-space-blue text-[12px] font-semibold">
                            참석자
                          </div>
                        )}
                      </div>
                      {renderUserImg(item.memberImageUrls)}
                    </div>
                  </div>
                </div>
              );
            } else if (item.spaceType == 'FOCUSDESK') {
              return (
                <div key={index} className="mx-4 mt-2 pb-3 border-b border-gray-300 ">
                  <div className="text-space-black text-base font-semibold">
                    개인 좌석
                  </div>
                  <div className="text-gray-400 text-sm font-normal mt-[5px]">
                    {renderTime(item.startAt)} ~ |{'   '}
                    {item.spaceName}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="mx-4 mt-2 pb-3 border-b border-gray-300 ">
                  <div className="text-space-black text-base font-semibold">
                    개인 휴식
                  </div>
                  <div className="text-gray-400 text-sm font-normal mt-[5px]">
                    {renderTime(item.startAt)} - {renderTime(item.endAt)} |{' '}
                    {item.spaceName}
                  </div>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default WeekScheduleItem;
