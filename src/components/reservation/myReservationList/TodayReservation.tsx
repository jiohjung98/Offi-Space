import React from 'react';
import FocuszoneItem from './roomTypeItem/FocuszoneItem';
import MeetingRoomItem from './roomTypeItem/MeetingRoomItem';

const TodayReservation = () => {
  // todo 전체 예약 내역에서 오늘 예약만 빼올것인지, 오늘 예약 api로 받아올것인지
  // todo 포커스존, 미팅룸, 리차징룸 구분해서
  return (
    <div>
      <FocuszoneItem />
      <MeetingRoomItem />
    </div>
  );
};

export default TodayReservation;
