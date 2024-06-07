import { format } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';
import { getTodayReservationList } from '../remote/myreservation';

const MyReservationNav = () => {
  const now = new Date();
  const formattedDate = format(now, 'MM.dd');
  const { data } = useQuery(['todayReservationList'], () => getTodayReservationList());

  return (
    <div className="bg-space-purple mt-2">
      <div className="mx-4 py-3 flex items-center justify-between text-white text-base font-semibold ">
        <div>{formattedDate} 오늘</div>
        <div>{data?.length}개의 예약</div>
      </div>
    </div>
  );
};

export default MyReservationNav;
