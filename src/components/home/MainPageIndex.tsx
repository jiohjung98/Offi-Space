'use client';
import React from 'react';
import BgPurpleLayout from './BgPurpleLayout';
import MainHeader from './MainHeader';
import CurrentOffice from './CurrentOffice';
import OfficeNotice from './OfficeNotice';
import UserInfo from './UserInfo';
import OfficeInfo from './OfficeInfo';
import WeekSchedule from './weekSchedule/WeekSchedule';
import AvailableRoom from './AvailableRoom';

const MainPageIndex = () => {
  return (
    <div className="mb-[100px]">
      <BgPurpleLayout>
        <div className="h-6 w-full" /> {/* 핸드폰 기본 상단 레이아웃 자리 */}
        <MainHeader />
        <CurrentOffice />
        <OfficeNotice />
        <UserInfo />
      </BgPurpleLayout>
      <div className="mx-4">
        <OfficeInfo />
        <WeekSchedule />
        <AvailableRoom />
      </div>
    </div>
  );
};

export default MainPageIndex;
