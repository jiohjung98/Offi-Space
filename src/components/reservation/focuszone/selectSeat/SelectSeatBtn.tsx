import React from 'react';

const SelectSeatBtn = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-center text-base font-medium text-space-black">
        좌석을 선택해주세요.
      </div>
      <div className="mt-[30px] w-full py-[13px] rounded-lg border border-gray-400 flex items-center justify-center font-normal text[15px] text-gray-500">
        예약
      </div>
    </div>
  );
};

export default SelectSeatBtn;
