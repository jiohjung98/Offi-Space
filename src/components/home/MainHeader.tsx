'use client';
import React from 'react';

const MainHeader = () => {
  return (
    <header>
      <div className="flex justify-between items-center py-2">
        <div className="w-[116px] h-8">
          <img src="/home/logo_white.png" alt="" className="w-full" />
        </div>
        <div className="flex justify-center items-center gap-6">
          <div>
            <img src="/home/Inquiry_white.svg" alt="" />
          </div>
          <div>
            <img src="/home/Notification_white.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
