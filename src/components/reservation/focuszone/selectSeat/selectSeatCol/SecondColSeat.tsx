import React from 'react';

const SecondColSeat = () => {
  return (
    <div>
      {/* 첫번째줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-t-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 bg-space-purple-light text-xs font-medium text-space-black">
              6
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div className=" w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
                7
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div className=" w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
                8
              </div>
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="mt-[16px] flex">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              15
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              16
            </div>
          </div>
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="border-r-[1.5px] border-gray-500">
        <div className="w-1 h-[48px] bg-gray-300" />
      </div>
    </div>
  );
};

export default SecondColSeat;
