'use client';
import React from 'react';

const OfficeInfo = () => {
  return (
    <div className="bg-white w-full py-5 px-5 rounded-b shadow border-b border-l border-r border-gray-200 flex flex-col gap-3 ">
      {/* 이용중일 때 */}
      <>
        <div className="flex items-center gap-2 font-normal text-sm">
          <div className=" text-gray-500">현재 이용</div>
          <div className="text-space-purple  underline ">강남1호점</div>
        </div>

        <div className="flex justify-between ">
          <div className="flex flex-col gap-1 ">
            <div className="text-gray-700 font-semibold text-base">
              스튜디오 조명 A-34룸
            </div>
            <div className="text-gray-500 text-sm font-normal">오늘 16:00 ~ 18:00</div>
          </div>

          <div className="cursor-pointer px-8 text-space-purple flex items-center justify-center border-2 border-space-purple font-medium rounded-md">
            이용종료
          </div>
        </div>
      </>

      {/* 예약된 일정이 있지만 이용전일때 */}
      {/* <>
        <div className="flex items-center gap-2 font-normal text-sm">
          <div className=" text-gray-500">다음 예약</div>
          <div className="text-space-purple  underline ">종로점</div>
        </div>

        <div className="flex justify-between ">
          <div className="flex flex-col gap-1 ">
            <div className="text-gray-700 font-semibold text-base">
              스튜디오 조명 A-34룸
            </div>
            <div className="text-gray-500 text-sm font-normal">오늘 16:00 ~ 18:00</div>
          </div>

          <div className="cursor-pointer px-8 text-gray-500 flex items-center justify-center border-2 border-gray-500 font-medium rounded-md">
            이용 전
          </div>
        </div>
      </> */}

      {/* 예약이 없을때 */}
      {/* <>
        <div className="my-[28px] flex justify-center items-center text-gray-700 text-base font-normal ">
          예정된 일정이 없습니다.
        </div>
      </> */}
    </div>
  );
};

export default OfficeInfo;
