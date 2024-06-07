import React from 'react';

const AvailableTitle = () => {
  return (
    <div className="mt-5 w-full rounded-t bg-white border-r border-l border-t border-gray-200">
      <div className="pt-6 flex">
        <div className="w-30 flex-1 border-r-2 border-space-purple-light flex flex-col gap-3 items-center">
          <div>
            <img src="reservation/usingRoom.svg" alt="" />
          </div>
          <div className="text-gray-700 text-sm font-normal pb-4 pt-[2px]">이용중</div>
        </div>
        <div className="w-30 flex-1 border-r-2 border-space-purple-light flex flex-col gap-3 items-center">
          <div>
            <img src="reservation/availRoom.svg" alt="" />
          </div>
          <div className="text-gray-700 text-sm font-semibold pb-4">이용 가능</div>
        </div>
        <div className="w-30 flex-1 flex flex-col gap-3 items-center">
          <div>
            <img src="reservation/allRoom.svg" alt="" />
          </div>
          <div className="text-gray-700 text-sm font-normal pb-4 pt-[1px]">총 좌석</div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTitle;
