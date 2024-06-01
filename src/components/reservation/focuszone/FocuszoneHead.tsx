import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const FocuszoneHead = () => {
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
    <div className="flex justify-between items-center pt-5">
      <div className="font-semibold text-lg">
        <span className="text-space-purple font-bold">실시간 </span>
        <span className="text-space-black">좌석 현황</span>
      </div>
      <div
        // todo : 새로고침 눌렀을 때 실시간 좌석 현황 다시 받아오기
        className="flex items-center gap-[10px]">
        <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
        <div
          className="cursor-pointer"
          onClick={() => setCurrentTime(format(new Date(), 'HH:mm'))}>
          <img src="reservation/focus_refresh.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FocuszoneHead;
