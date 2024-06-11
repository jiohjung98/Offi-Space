import { todayListData } from '@/components/reservation/model/myreservation';
import { getReservationDetail } from '@/components/reservation/remote/myreservation';
import { useReservationStore } from '@/store/reservationModal.store';
import { format, isBefore, parse } from 'date-fns';
import React from 'react';
import { useQuery } from 'react-query';

interface OfficeInfoMeetingType {
  data: todayListData;
}

const OfficeInfoMeeting = ({ data }: OfficeInfoMeetingType) => {
  const { setDeleteOpen, setDeleteDeskId, setIsLeader, setRoomType, setIsMeeting } =
    useReservationStore();

  const { data: meetingData } = useQuery(
    ['reservationDetail', data?.reservationId],
    () => getReservationDetail(data?.reservationId),
    {
      enabled: data?.reservationId != null
    }
  );

  const startDate = parse(data?.startAt, 'yyyy-MM-dd HH:mm', new Date());
  const endDate = parse(data?.endAt, 'yyyy-MM-dd HH:mm', new Date());
  const formattedStartTime = format(startDate, 'HH:mm');
  const formattedEndTime = format(endDate, 'HH:mm');

  const renderBtn = () => {
    const result = isBefore(data?.startAt, new Date());
    if (!result && meetingData?.myMemberType == 'REPRESENTATIVE') {
      return (
        <div
          onClick={() => {
            setRoomType('MEETING');
            setDeleteDeskId(data?.reservationId);
            setIsMeeting(true);
            setIsLeader(true);
            setDeleteOpen(true);
          }}
          className="cursor-pointer w-[107px] h-9 text-space-purple flex items-center justify-center border-2 border-space-purple font-medium rounded-md">
          예약 취소
        </div>
      );
    } else if (!result && meetingData?.myMemberType == 'PARTICIPANT') {
      return (
        <div
          onClick={() => {
            setRoomType('MEETING');
            setIsLeader(false);
            setDeleteDeskId(data?.reservationId);
            setIsMeeting(true);
            setDeleteOpen(true);
          }}
          className="cursor-pointer w-[107px] h-9 text-space-purple flex items-center justify-center border-2 border-space-purple font-medium rounded-md">
          참여 취소
        </div>
      );
    } else {
      return (
        <div className="cursor-pointer w-[107px] h-9 text-gray-500 flex items-center justify-center border-2 border-gray-400 font-medium rounded-md">
          이용 중
        </div>
      );
    }
  };
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

        {renderBtn()}
      </div>
    </div>
  );
};

export default OfficeInfoMeeting;
