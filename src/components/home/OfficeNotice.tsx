import React from 'react';

const OfficeNotice = () => {
  return (
    <div className="w-full h-12 mt-7 bg-gray-200 flex items-center gap-[13px] px-[13px] py-[14px] rounded shadow border border-gray-200">
      <div>
        <img src="/home/notice.svg" alt="" />
      </div>

      <div className="flex-1 flex items-center gap-[22px] justify-between">
        <div className="text-sm font-normal flex justify-center text-space-purple-darker">
          유저님, 오늘 하루도 화이팅 하세요!
        </div>
        <div>
          <img src="/home/toNext.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default OfficeNotice;
