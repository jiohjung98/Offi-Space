import React from 'react';
import BgPurpleLayout from './BgPurpleLayout';
import MainHeader from './MainHeader';
import CurrentOffice from './CurrentOffice';
import OfficeNotice from './OfficeNotice';
import UserInfo from './UserInfo';
import OfficeInfo from './OfficeInfo';
import WeekSchedule from './weekSchedule/WeekSchedule';

const MainPageIndex = () => {
  return (
    <div>
      <BgPurpleLayout>
        {/* 핸드폰 기본 상단 레이아웃 자리 */}
        <div className="h-6 w-full" />
        <MainHeader />
        <CurrentOffice />
        <OfficeNotice />
        <UserInfo />
      </BgPurpleLayout>
      <div className="mx-4">
        <OfficeInfo />
        <WeekSchedule />
      </div>
    </div>
  );
};

export default MainPageIndex;
