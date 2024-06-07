import { useRouter } from 'next/router';
import React from 'react';

const ReservationHeader = () => {
  const router = useRouter();
  return (
    <header className="border-b border-stone-50  bg-white fixed top-0 w-[393px] h-20 px-4 py-6 flex justify-between items-center z-[9999]">
      <div onClick={() => router.push('/')} className="w-[116px] cursor-pointer">
        <img src="/officelogo.svg" alt="" />
      </div>
      <div className="flex items-center justify-center gap-6">
        <div
          onClick={() => router.push('reservation/myreservationlist')}
          className="cursor-pointer">
          <img src="/reservation/listicon.svg" alt="" />
        </div>
        <div className="cursor-pointer">
          <img src="/Notification.svg" alt="" />
        </div>
      </div>
    </header>
  );
};

export default ReservationHeader;
