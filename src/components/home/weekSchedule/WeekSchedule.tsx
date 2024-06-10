'use client';
import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isSaturday,
  isSunday,
  isSameDay,
  parse
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getDayReservationList } from '../remote/mainReservation';
import { todayListData } from '@/components/reservation/model/myreservation';
import Image from 'next/image';

const WeekSchedule = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const today: Date = new Date();
  const startDate: Date = startOfWeek(today, { weekStartsOn: 1 });
  const daysOfWeek: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day: Date = addDays(startDate, i);
    daysOfWeek.push(day);
  }
  const formattedSelectedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  const { data } = useQuery(
    ['getDayReservation', formattedSelectedDate],
    () => getDayReservationList(formattedSelectedDate),
    {
      enabled: !!formattedSelectedDate
    }
  );

  if (!data) {
    return <div className="h-[348px]" />;
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
    <div className="py-10 flex flex-col gap-4">
      {/* 이번주일정 */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold  text-gray-800">이번 주 일정</div>
        <div className="flex justify-center items-center gap-2 cursor-pointer">
          <div
            onClick={() => router.push('reservation/myreservationlist')}
            className="text-gray-500 text-sm font-normal ">
            전체보기
          </div>
          <img src="/home/toNext_gray.svg" alt="" />
        </div>
      </div>
      {/* 주차별 캘린더 */}
      <div className="flex gap-[11px] justify-center items-center bg-violet-50">
        {daysOfWeek.map((day, i) => (
          <div
            className={`py-[13px] px-[11px] flex flex-col gap-[13px] cursor-pointer text-base font-medium 
            ${isSaturday(day) || isSunday(day) ? 'text-gray-400' : 'text-gray-600'} 
            ${selectedDate && isSameDay(day, selectedDate) ? 'bg-space-purple text-white rounded-[30px]' : ''}
            items-center justify-center`}
            key={i}
            onClick={() => {
              setSelectedDate(day);
            }}>
            <div>{format(day, 'EEEE', { locale: ko }).slice(0, 1)}</div>
            <div>{format(day, 'dd')}</div>
          </div>
        ))}
      </div>

      {/* 예약 리스트 */}
      {/* 예약 일정이 없을 때 */}
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
                <div
                  key={index}
                  className="flex items-center gap-2 mx-4 mt-3 pb-4 border-b border-gray-300">
                  <div className="w-[3px] h-[44px] bg-yellow-400" />
                  <div className="flex-1 flex flex-col gap-[5px">
                    <div className="text-space-black text-base font-semibold">
                      {item.reservationName}
                    </div>
                    <div className="text-gray-400 text-sm font-normal">
                      {renderTime(item.startAt)} - {renderTime(item.endAt)} |{'   '}
                      {item.spaceName}
                    </div>
                  </div>
                  {renderUserImg(item.memberImageUrls)}
                </div>
              );
            } else if (item.spaceType == 'FOCUSDESK') {
              return (
                <div key={index} className="mx-4 mt-3 pb-4 border-b border-gray-300 ">
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
                <div key={index} className="mx-4 mt-3 pb-4 border-b border-gray-300 ">
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

export default WeekSchedule;
