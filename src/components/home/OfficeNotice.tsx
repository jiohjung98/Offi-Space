import React from 'react';
import { useNotices } from '@/hook/useNotices';

const OfficeNotice: React.FC = () => {
  
  const { urgentNoticeTitle } = useNotices();

return (
  <div className="w-full h-12 mt-7 bg-gray-200 flex items-center gap-[13px] px-[13px] py-[14px] rounded shadow border border-gray-200">
    <div>
      <img src="/home/notice.svg" alt="" />
    </div>

    <div className="flex-1 flex items-center gap-[22px] justify-between">
      <div className="text-sm font-normal flex justify-center text-space-purple-darker">
        {urgentNoticeTitle ? urgentNoticeTitle : '긴급 공지가 없습니다.'}
      </div>
      <div>
        <img src="/home/toNext.svg" alt="" />
      </div>
    </div>
  </div>
);
};

export default OfficeNotice;
