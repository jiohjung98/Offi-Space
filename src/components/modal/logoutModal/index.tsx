// components/LogoutModal.tsx
import React from 'react';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
      onClick={onCancel}>
      <div className="w-[281px] h-[159px] bg-white rounded-2xl flex flex-col ">
        <div className="p-4 text-center mt-[30px] pb-[10px]">
          <div className="text-black/70 text-lg font-bold font-['Pretendard'] leading-normal">
            로그아웃 하시겠어요?
          </div>
        </div>
        <div className="w-full h-[1px]  bg-gray-300 mt-[32px]"></div>
        <div className="flex justify-between">
          <button
            className="h-[42px] flex-1 text-center font-bold text-indigo-700    leading-normal  text-lg  font-['Pretendard']"
            onClick={onConfirm}>
            확인
          </button>
          <div className="w-[1px] h-full bg-gray-300"></div>
          <button
            className=" h-[42px] flex-1 text-center font-bold text-stone-500  leading-normal  text-lg  font-['Pretendard']"
            onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
