import { useRouter } from 'next/router';
import React from 'react';

const MyReservationHeader = () => {
  const router = useRouter();
  return (
    <div className="mt-6 ">
      <div className="flex items-center gap-3 py-3 mx-4">
        <div onClick={() => router.back()} className="cursor-pointer">
          <img src="/reservation/tobackicon.svg" alt="toback" />
        </div>
        <div className="text-space-black text-lg font-bold">나의 예약</div>
      </div>
    </div>
  );
};

export default MyReservationHeader;
