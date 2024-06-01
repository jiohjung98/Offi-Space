import React from 'react';

const FirstColSeat = () => {
  return (
    <div>
      {/* 첫번째 줄 */}
      <div className="border-r-[1.5px] border-l-[1.5px] border-t-[1.5px] border-gray-500 w-full h-10 flex">
        <div className="ml-[86px] border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div className="flex items-center justify-center rounded-md  h-full w-8 bg-space-purple-light text-xs font-medium text-space-black ">
            1
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div className="flex items-center justify-center rounded-md  h-full w-8 bg-space-purple-light text-xs font-medium text-space-black ">
            2
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div className="flex items-center justify-center rounded-md  h-full w-8 bg-space-purple-light text-xs font-medium text-space-black ">
            3
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div className="flex items-center justify-center rounded-md  h-full w-8 bg-space-purple-light text-xs font-medium text-space-black ">
            4
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div className="flex items-center justify-center rounded-md  h-full w-8 bg-space-purple-light text-xs font-medium text-space-black ">
            5
          </div>
        </div>
      </div>
      <div className="w-full border-r-[1.5px] border-gray-500 text-gray-500 font-semibold text-xs pl-1 py-5">
        Entrance
      </div>
      <div className="border-x-[1.5px] border-gray-500 flex items-center justify-between">
        {/* 왼쪽 */}
        <div className="flex flex-col">
          <div className="h-5" />
          <div className=" w-[112px] h-[42px] bg-gray-200 text-gray-500 text-xs font-semibold flex items-center justify-center">
            Locker
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex border-b-[1.5px] border-gray-500 mt-5">
          <div className="w-[23px]" />
          <div className="border-l-[1.5px] border-gray-500">
            <div className="flex justify-between">
              <div className="h-5 w-[35px] border-t-[1.5px] border-gray-500" />
              <div className="h-5 w-[35px] border-t-[1.5px] border-gray-500" />
            </div>
            <div className="w-[113px] h-[22px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold ">
              Service Bar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstColSeat;
