import React from 'react';

const OfficeInfo = () => {
  return (
    <div className="bg-white w-full py-5 px-5 rounded-b shadow border-b border-l border-r border-gray-200 flex flex-col gap-3 ">
      <div className="flex items-center gap-2 font-normal text-sm">
        <div className=" text-gray-500">현재 이용</div>
        <div className="text-space-purple  underline ">강남1호점</div>
      </div>

      <div className="flex justify-between ">
        {/* 왼쪽 */}
        <div className="flex flex-col gap-1 ">
          {/* 위 */}
          <div className="text-gray-700 font-semibold text-base">
            스튜디오 조명 A-34룸
          </div>
          {/* 아래 */}
          <div className="text-gray-500 text-sm font-normal">오늘 16:00 ~ 18:00</div>
        </div>

        {/* 오른쪽 */}
        <div className="cursor-pointer py-2 px-5 text-space-purple flex items-center justify-center border-2 border-space-purple font-medium rounded-md">
          이용종료
        </div>
      </div>
    </div>
  );
};

export default OfficeInfo;
