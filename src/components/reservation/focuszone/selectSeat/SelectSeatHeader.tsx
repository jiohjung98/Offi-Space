import { useRouter } from 'next/router';
import React from 'react';

const SelectSeatHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 mt-[38px]">
      <div onClick={() => router.back()} className="cursor-pointer">
        <img src="/reservation/toback.svg" alt="" />
      </div>
      <div className="text-space-black font-bold text-lg">좌석 배치도</div>
    </div>
  );
};

export default SelectSeatHeader;
