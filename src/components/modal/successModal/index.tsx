// components/SuccessModal.tsx
import React from 'react';

const SuccessModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
      <div className="w-[281px] h-[159px] bg-white rounded-2xl flex flex-col ">
        <div className="p-4 text-center mt-[30px] pb-[10px]">
          <div className="text-center text-black/opacity-20 text-lg font-bold font-['Pretendard'] leading-normal">
            안전하게
            <br />
            로그아웃 되었습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
