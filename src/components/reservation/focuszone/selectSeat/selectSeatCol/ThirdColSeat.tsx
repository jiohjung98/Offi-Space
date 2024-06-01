import React from 'react';

const ThirdColSeat = () => {
  return (
    <div>
      {/* 첫번째 줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-b-[1.5px] border-gray-500 ">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
              9
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
              10
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
              11
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              17
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              18
            </div>
          </div>
        </div>
      </div>

      {/* 두번째줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className=" border-gray-500 ">
            <div className=" w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
              12
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div className=" w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
                13
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div className=" w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px] bg-space-purple-light text-xs font-medium text-space-black">
                14
              </div>
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex mt-[44px]">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              19
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div className="w-8 h-8 flex items-center rounded-md justify-center mx-[8.5px] my-[7px] bg-space-purple-light text-xs font-medium text-space-black">
              20
            </div>
          </div>
        </div>
      </div>
      {/* 세번째줄 */}
      <div className="h-[25px] border-x-[1.5px] border-gray-500 flex">
        <div className="border-b-[1.5px] border-gray-500 w-28" />
        <div className="font-semibold text-xs text-gray-500 w-[72px] flex justify-center">
          Entrance
        </div>
        <div className="border-b-[1.5px] border-gray-500 flex-1" />
      </div>
    </div>
  );
};

export default ThirdColSeat;
