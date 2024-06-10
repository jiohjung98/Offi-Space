import { todayListData } from '@/components/reservation/model/myreservation';
import { useReservationStore } from '@/store/reservationModal.store';
import { format, isBefore, parse } from 'date-fns';
import React from 'react';

interface OfficeInfoRechargingType {
  data: todayListData;
}

const OfficeInfoRecharging = ({ data }: OfficeInfoRechargingType) => {
  const { setDeleteOpen, setDeleteDeskId, setIsLeader, setRoomType, setIsMeeting } =
    useReservationStore();

  const startDate = parse(data?.startAt, 'yyyy-MM-dd HH:mm', new Date());
  const endDate = parse(data?.endAt, 'yyyy-MM-dd HH:mm', new Date());

  const formattedStartTime = format(startDate, 'HH:mm');
  const formattedEndTime = format(endDate, 'HH:mm');

  return (
    <div className="bg-white w-full py-5 px-5 rounded-b shadow border-b border-l border-r border-gray-200 flex flex-col gap-3 ">
      <div className="flex items-center gap-2 font-normal text-sm">
        <div className=" text-gray-500">현재 이용</div>
        <div className="text-space-purple  underline ">{data?.branchName}</div>
      </div>

      <div className="flex justify-between ">
        <div className="flex flex-col gap-1 ">
          <div className="text-gray-700 font-semibold text-base">{data?.spaceName}</div>
          <div className="text-gray-500 text-sm font-normal">
            오늘 {formattedStartTime} ~ {formattedEndTime}
          </div>
        </div>

        {isBefore(data?.startAt, new Date()) ? (
          <div className="cursor-pointer w-[107px] h-9 text-gray-500 flex items-center justify-center border-2 border-gray-400 font-medium rounded-md">
            이용 중
          </div>
        ) : (
          <div
            onClick={() => {
              setRoomType('RECHARGING');
              setIsLeader(false);
              setIsMeeting(false);
              setDeleteDeskId(data?.reservationId);
              setDeleteOpen(true);
            }}
            className="cursor-pointer w-[107px] h-9 text-space-purple flex items-center justify-center border-2 border-space-purple font-medium rounded-md">
            예약 취소
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficeInfoRecharging;
