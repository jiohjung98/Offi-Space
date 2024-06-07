'use client';
import { useReservationStore } from '@/store/reservationModal.store';
import React from 'react';
import { todayListData } from '../../model/myreservation';

interface RechargingItemType {
  roomData: todayListData;
}

const RechargingItem = ({ roomData }: RechargingItemType) => {
  const { setOpen, setReservationId, setIsMeeting } = useReservationStore();
  return (
    <div
      onClick={() => {
        setOpen(true);
        setIsMeeting(false);
        setReservationId(roomData?.reservationId);
      }}
      className="py-4 px-[26px] flex flex-col gap-1 border-b border-gray-300 cursor-pointer">
      {/* 고정 */}
      <div className="text-space-black text-md font-semibold">리차징룸</div>

      <div className="flex flex-col text-gray-500 text-sm font-normal ">
        {/* 변경 필요 */}
        <div>{roomData?.branchName} 리차징룸 3</div>
        <div>
          {roomData?.startAt} - {roomData?.endAt}
        </div>
      </div>
    </div>
  );
};

export default RechargingItem;
