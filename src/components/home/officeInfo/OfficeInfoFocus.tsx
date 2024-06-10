import { todayListData } from '@/components/reservation/model/myreservation';
import { getReservationDetail } from '@/components/reservation/remote/myreservation';
import { useReservationStore } from '@/store/reservationModal.store';
import { format, parse } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';

interface OfficeInfoFocusType {
  data: todayListData;
}

const OfficeInfoFocus = ({ data }: OfficeInfoFocusType) => {
  const { setDeleteOpen, setDeleteDeskId, setRoomType, setIsLeader, setIsMeeting } =
    useReservationStore();

  const { data: focusData } = useQuery(
    ['reservationDetail', data?.reservationId],
    () => getReservationDetail(data?.reservationId),
    {
      enabled: data?.reservationId != null
    }
  );

  const date = parse(data?.startAt, 'yyyy-MM-dd HH:mm', new Date());
  const formattedTime = format(date, 'HH:mm');

  return (
    <div className="bg-white w-full py-5 px-5 rounded-b shadow border-b border-l border-r border-gray-200 flex flex-col gap-3 ">
      <div className="flex items-center gap-2 font-normal text-sm">
        <div className=" text-gray-500">현재 이용</div>
        <div className="text-space-purple  underline ">{data?.branchName}</div>
      </div>

      <div className="flex justify-between ">
        <div className="flex flex-col gap-1 ">
          <div className="text-gray-700 font-semibold text-base">
            {data?.spaceName}번 좌석
          </div>
          <div className="text-gray-500 text-sm font-normal">오늘 {formattedTime} ~ </div>
        </div>

        <div
          onClick={() => {
            setRoomType('FOCUS');
            setIsMeeting(false);
            setIsLeader(false);
            setDeleteDeskId(focusData?.spaceId);
            setDeleteOpen(true);
          }}
          className="cursor-pointer w-[107px] h-9 text-red-700 flex items-center justify-center border-2 border-red-700 font-medium rounded-md">
          이용 종료
        </div>
      </div>
    </div>
  );
};

export default OfficeInfoFocus;
