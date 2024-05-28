'use client';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const AvailableRoom = () => {
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCurrentTime(format(new Date(), 'HH:mm'));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="pb-10">
      {/* 상단 */}
      <div className="flex justify-between items-center">
        <div className="text-gray-800 font-bold text-xl ">예약 가능한 공간</div>
        <div className="text-gray-400 text-sm font-normal flex justify-center items-center gap-1">
          <div>{currentTime} 기준</div>
          <div
            className="cursor-pointer"
            onClick={() => setCurrentTime(format(new Date(), 'HH:mm'))}>
            <img src="/home/refresh.svg" alt="" />
          </div>
        </div>
      </div>

      {/* 중간 */}
      <div className="flex gap-[76px] items-center justify-center mt-6">
        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/M_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">미팅룸</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">1</span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">30</div>
          </div>
        </div>

        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/R_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">리차징룸</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">1</span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">30</div>
          </div>
        </div>

        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/G_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">포커스존</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">1</span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">30</div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className="cursor-pointer mt-8 rounded-lg w-full h-12 border-2 border-space-purple flex justify-center items-center text-space-purple text-[15px] font-semibold">
        예약하기
      </div>
    </div>
  );
};

export default AvailableRoom;
