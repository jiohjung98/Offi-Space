'use client';
import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSaturday, isSunday, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/router';

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
            onClick={() => setSelectedDate(day)}>
            <div>{format(day, 'EEEE', { locale: ko }).slice(0, 1)}</div>
            <div>{format(day, 'dd')}</div>
          </div>
        ))}
      </div>
      {/* 예약 리스트 */}
      {/* 예약 일정이 없을 때 */}
      <div className="py-12 border-b border-gray-200">
        <div className="text-gray-500 text-base font-medium flex items-center justify-center">
          예약된 일정이 없습니다.
        </div>
      </div>
    </div>
  );
};

export default WeekSchedule;
