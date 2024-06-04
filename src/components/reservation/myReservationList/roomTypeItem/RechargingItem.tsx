'use client';
import { useReservationStore } from '@/store/reservationModal.store';
import React from 'react';

const RechargingItem = () => {
  const { setOpen, setReservationId, setIsMeeting } = useReservationStore();
  return (
    <div
      onClick={() => {
        setOpen(true);
        setIsMeeting(false);
        //todo 임의로 1넣음
        setReservationId('1');
      }}
      className="py-4 px-[26px] flex flex-col gap-1 border-b border-gray-300 cursor-pointer">
      {/* 고정 */}
      <div className="text-space-black text-md font-semibold">리차징룸</div>

      <div className="flex flex-col text-gray-500 text-sm font-normal ">
        {/* 받아온 데이터에 따라 달라짐 */}
        <div>종로점 리차징룸 3</div>
        <div>10:00 - 10:30</div>
      </div>
    </div>
  );
};

export default RechargingItem;
