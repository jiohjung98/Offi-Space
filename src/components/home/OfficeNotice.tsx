import React, { useState } from 'react';
import { useNotices } from '@/hook/useNotices';

const OfficeNotice: React.FC = () => {
  const { urgentNoticeTitle, urgentNoticeContent } = useNotices();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-12 mt-7 bg-gray-200 flex items-center gap-[13px] px-[13px] py-[14px] rounded shadow border border-gray-200">
        <div>
          <img src="/home/notice.svg" alt="" />
        </div>

        <div className="flex-1 flex items-center gap-[22px] justify-between">
          <div className="text-sm font-normal flex justify-center text-space-purple-darker">
            {urgentNoticeTitle ? urgentNoticeTitle : '긴급 공지가 없습니다.'}
          </div>
          {urgentNoticeContent && (
            <div onClick={handleModalOpen} className="cursor-pointer">
              <img src="/home/toNext.svg" alt="" />
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed w-full inset-0 flex items-center justify-center z-[9999]">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleModalClose}></div>
          <div className="bg-white p-6 rounded shadow-lg z-50 max-w-[393px] mx-[20px] px-[20px]">
            <h2 className="text-center text-xl font-semibold mb-4">긴급 공지</h2>
            <p>{urgentNoticeContent}</p>
            <div className="w-full">
              <button
                onClick={handleModalClose}
                className="flex mx-auto mt-4 w-[163px] h-[36px] bg-[#EDEBF8] text-[#3B268C] px-4 py-[6px] rounded-md justify-center items-center">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficeNotice;
