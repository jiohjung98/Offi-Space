import React, { Dispatch } from 'react';
import { useRouter } from 'next/router';

interface ConfirmModalType {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal = ({ setModalOpen }: ConfirmModalType) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[9999]">
      <div className="z-50 w-[281px] bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="flex items-center justify-center mt-[25px]">
          <img src="/reservation/focuszonconfirm.svg" alt="" />
        </div>
        <div className="text-space-black font-bold text-lg flex items-center justify-center mt-4">
          예약이 완료되었습니다.
        </div>
        <div className="text-[15px] font-normal text-gray-900 flex items-center justify-center mt-1">
          예약 내역을 확인해주세요.
        </div>
        <div className="mt-[28px] border-t py-[10px] flex items-center justify-center border-gray-300 cursor-pointer text-lg font-semibold text-space-purple">
          확인
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
