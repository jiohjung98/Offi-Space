import React from 'react';
import { useRouter } from 'next/router';

const ConfirmModal = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-30">
      <div className="z-50 w-[281px] bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="leading-normal text-gray-900">
          <div>
            <div className="font-bold mt-10 flex justify-center text-xl">
              존재하지 않는 게시글 입니다.
            </div>
          </div>

          <div className="mt-7 flex font-semibold items-center justify-center">
            <div
              onClick={() => router.back()}
              className="cursor-pointer h-9 w-[230px] rounded-lg bg-space-purple text-white flex items-center justify-center my-4">
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
