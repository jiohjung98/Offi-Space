import useOnClickOutside from '@/components/community/hooks/useOnClickOutside';
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  deleteFocuszone,
  deleteMeetingRoom,
  deleteRechargingRoom
} from '../../remote/myreservation';

const ReservationDeleteModal = () => {
  const { deleteDeskId, setDeleteOpen, isMeeting, isLeader, roomType } =
    useReservationStore();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    (deskId: number) => {
      if (roomType === 'FOCUS') {
        return deleteFocuszone(deskId);
      } else if (roomType === 'RECHARGING') {
        return deleteRechargingRoom(deskId);
      } else {
        return deleteMeetingRoom(deskId);
      }
    },
    {
      onSuccess: () => {
        setDeleteOpen(false);
        queryClient.invalidateQueries(['todayReservationList']);
        queryClient.invalidateQueries(['expectedReservationList']);
      }
    }
  );

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setDeleteOpen(false));

  const renderTitle = () => {
    if (isMeeting && isLeader) {
      return (
        <div className="mx-[30px] mt-10 text-space-black font-bold text-lg">
          예약을 취소하시겠어요?
        </div>
      );
    } else if (isMeeting && !isLeader) {
      return (
        <div className="mx-[30px] mt-10 text-space-black font-bold text-lg">
          참여를 취소하시겠어요?
        </div>
      );
    } else if (roomType === 'RECHARGING') {
      return (
        <div className="mx-[30px] mt-10 text-space-black font-bold text-lg">
          예약을 취소하시겠어요?
        </div>
      );
    } else {
      return (
        <div className="mx-[30px] mt-10 text-space-black font-bold text-lg">
          이용을 종료하시겠어요?
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[99999]">
      <div
        ref={ref}
        className="z-50 w-[393px] bg-white absolute left-1/2 bottom-0 transform -translate-x-1/2 rounded-t-2xl">
        {/* 공통부분 */}
        {renderTitle()}
        {isMeeting && isLeader && (
          <div className="text-base font-normal text-space-black mx-[30px] mt-[26px]">
            예약을 취소하시면, 등록된 참석자 모두의 일정에 반영됩니다. 삭제하시겠어요?
          </div>
        )}
        <div className="mb-5 mt-[26px] mx-6 flex items-center gap-3">
          <div
            onClick={() => setDeleteOpen(false)}
            className="cursor-pointer flex-1 flex items-center justify-center py-[12.5px] rounded-lg border border-space-purple text-base text-space-purple font-semibold">
            취소
          </div>
          <div
            onClick={() => {
              if (deleteDeskId) {
                mutateAsync(deleteDeskId);
              }
            }}
            className=" cursor-pointer flex-1 flex items-center justify-center py-[12.5px] rounded-lg text-white bg-space-purple font-semibold text-base">
            확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDeleteModal;
