'use client';
import { useRouter } from 'next/router';
import React from 'react';

const MainHeader = () => {
  const router = useRouter();
  return (
    <header>
      <div className="flex justify-between items-center py-2">
        <div className="w-[116px] h-8 cursor-pointer">
          <img src="/officelogowhite.svg" alt="" className="w-full" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <div onClick={() => router.push('mypage/question')}>
            <img src="/home/Inquiry_white.svg" alt="" />
          </div>
          <div onClick={() => router.push('/notification')}>
            <img src="/home/Notification_white.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
