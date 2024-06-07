import useOnClickOutside from '@/components/community/hooks/useOnClickOutside';
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteFocuszone } from '../remote/myreservation';

const ReservationDeleteModal = () => {
  const { deleteDeskId, setDeleteOpen } = useReservationStore();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation((deskId: number) => deleteFocuszone(deskId), {
    onSuccess: () => {
      setDeleteOpen(false);
      queryClient.invalidateQueries(['todayReservationList']);
    }
  });

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setDeleteOpen(false));

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[9999]">
      <div
        ref={ref}
        className="z-50 w-[393px] bg-white absolute left-1/2 bottom-0 transform -translate-x-1/2 rounded-t-2xl">
        {/* 공통부분 */}
        <div className="mx-[30px] my-10 text-space-black font-bold text-lg">
          이용을 종료하시겠어요?
        </div>
        <div className="mb-5 mx-6 flex items-center gap-3">
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
            className="cursor-pointer flex-1 flex items-center justify-center py-[12.5px] rounded-lg text-white bg-space-purple font-semibold text-base">
            확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDeleteModal;
