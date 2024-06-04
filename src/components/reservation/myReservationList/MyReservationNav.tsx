import { format } from 'date-fns';
import React from 'react';

const MyReservationNav = () => {
  const now = new Date();
  const formattedDate = format(now, 'MM.dd');
  return (
    <div className="bg-space-purple ">
      <div className="mx-4 py-3 flex items-center justify-between text-white text-base font-semibold ">
        <div>{formattedDate} 오늘</div>
        {/* todo 예약 전체 조회에서 갯수 받아오기 */}
        <div>2개의 예약</div>
      </div>
    </div>
  );
};

export default MyReservationNav;
