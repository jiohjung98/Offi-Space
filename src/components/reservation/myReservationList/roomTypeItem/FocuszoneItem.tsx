'use client';
import { useReservationStore } from '@/store/reservationModal.store';
import React from 'react';
import { todayListData } from '../../model/myreservation';

interface FocuszoneItem {
  roomData: todayListData;
}

const FocuszoneItem = ({ roomData }: FocuszoneItem) => {
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
      <div className="text-space-black text-md font-semibold">포커스존</div>

      <div className="flex flex-col text-gray-500 text-sm font-normal ">
        {/* 받아온 데이터에 따라 달라짐 */}
        <div>
          {roomData?.branchName} {roomData?.spaceName}
        </div>
        <div>{roomData?.startAt} ~</div>
      </div>
    </div>
  );
};

export default FocuszoneItem;
