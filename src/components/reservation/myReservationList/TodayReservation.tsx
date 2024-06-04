import React from 'react';
import FocuszoneItem from './roomTypeItem/FocuszoneItem';
import MeetingRoomItem from './roomTypeItem/MeetingRoomItem';
import RechargingItem from './roomTypeItem/RechargingItem';

const TodayReservation = () => {
  return (
    // 예약된 내역이 있을 때
    <div>
      <FocuszoneItem />
      <MeetingRoomItem />
      <RechargingItem />
    </div>
    // 예약된 내역이 없을 때
    // <div className="border-b border-gray-300 mx-4 py-12 flex flex-col items-center justify-center text-base font-medium text-gray-500">
    //   <div>예약된 일정이 없습니다.</div>
    //   <div>다양한 공간을 예약해 보세요!</div>
    // </div>
  );
};

export default TodayReservation;
