'use client';
import useOnClickOutside from '@/components/community/hooks/useOnClickOutside';
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';

const FRDetailModal = () => {
  const { setOpen, reservationId, setDeleteOpen } = useReservationStore();

  const { data } = useQuery(
    ['reservationDetail', reservationId],
    () => {
      //변경필요
      console.log('asdasd');
    },
    {
      enabled: !!reservationId
    }
  );

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[9999]">
      <div
        ref={ref}
        className="z-50 w-[393px] bg-white absolute left-1/2 bottom-0 transform -translate-x-1/2 rounded-t-2xl">
        {/* 공통부분 */}
        <div className="mx-[30px]">
          <div className="mt-[30px] text-space-black text-lg font-bold">포커스존</div>
          <div className="mt-8 flex gap-2 ">
            <div className="mt-[6px]">
              <img src="/reservation/modaltime.svg" alt="" />
            </div>
            <div>
              <div className="text-space-black text-base font-semibold">06.12 오늘</div>
              <div className="text-space-black text-sm font-medium">14:00-15:00</div>
            </div>
          </div>

          <div className="mt-[25px] flex gap-2 ">
            <div className="mt-1">
              <img src="/reservation/modallocation.svg" alt="" />
            </div>
            <div>
              <div className="text-space-black text-base font-semibold">
                광화문점 포커스존12
              </div>
              <div className="text-space-black text-sm font-medium">
                서울 종로구 중랑천길 345번길 48
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setOpen(false);
              setDeleteOpen(true);
            }}
            className="cursor-pointer rounded-xl border-2 border-space-purple my-8 py-[13px] flex items-center justify-center text-space-purple font-semibold text-lg ">
            이용 종료
          </div>
        </div>
      </div>
    </div>
  );
};

export default FRDetailModal;
