import React from 'react';

const SeatInfo = () => {
  return (
    <div className="mt-5 pb-[30px] border-b border-gray-100 flex items-center justify-center gap-[22px]">
      <div className="flex gap-1 items-center">
        <div className="w-3 h-3 rounded-sm bg-gray-500" />
        <div className="text-gray-800 text-xs font-semibold">예약 마감</div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="w-3 h-3 rounded-sm bg-space-purple" />
        <div className="text-gray-800 text-xs font-semibold">선택 좌석</div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="w-3 h-3 rounded-sm bg-space-purple-light" />
        <div className="text-gray-800 text-xs font-semibold">예약 가능</div>
      </div>
    </div>
  );
};

export default SeatInfo;
