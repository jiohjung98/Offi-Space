'use client';
import useOnClickOutside from '@/components/community/hooks/useOnClickOutside';
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { getReservationDetail } from '../../remote/myreservation';
import { format, isBefore, isSameDay, parseISO } from 'date-fns';
import { participantsType } from '../../model/myreservation';
import { ko } from 'date-fns/locale';
// import { useRouter } from 'next/navigation';

const MeetingDetailModal = () => {
  // const router = useRouter();
  const {
    setOpen,
    reservationId,
    setDeleteOpen,
    setDeleteDeskId,
    setIsLeader,
    setRoomType
  } = useReservationStore();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  const { data } = useQuery(
    ['reservationDetail', reservationId],
    () => getReservationDetail(reservationId),
    {
      enabled: reservationId != null
    }
  );

  // useEffect(() => {
  //   if (data == undefined) {
  //     alert('이미 종료된 일정입니다');
  //     router.push('/');
  //   }
  // }, []);

  if (data == undefined) {
    return null;
  }

  const date =
    data && data.startAt
      ? isSameDay(parseISO(data.startAt), new Date())
        ? '오늘'
        : format(parseISO(data.startAt), 'EEE요일', { locale: ko })
      : '';
  const renderButton = () => {
    const result = isBefore(data?.startAt, new Date());
    if (!result && data?.myMemberType == 'REPRESENTATIVE') {
      return (
        <div
          onClick={() => {
            setRoomType('MEETING');
            setIsLeader(true);
            setDeleteDeskId(data?.reservationId);
            setOpen(false);
            setDeleteOpen(true);
          }}
          className="cursor-pointer rounded-xl border-2 border-space-purple my-8 py-[13px] flex items-center justify-center text-space-purple text-semibold text-lg ">
          예약 취소
        </div>
      );
    } else if (!result && data?.myMemberType == 'PARTICIPANT') {
      return (
        <div
          onClick={() => {
            setRoomType('MEETING');
            setIsLeader(false);
            setDeleteDeskId(data?.reservationId);
            setOpen(false);
            setDeleteOpen(true);
          }}
          className="cursor-pointer rounded-xl border-2 border-space-purple my-8 py-[13px] flex items-center justify-center text-space-purple text-semibold text-lg ">
          참여 취소
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            setOpen(false);
            setDeleteOpen(true);
          }}
          className="rounded-xl border-2 border-gray-300 my-8 py-[13px] flex items-center justify-center text-gray-400 text-semibold text-lg ">
          이용 중
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
        <div className="mx-[30px]">
          <div className="mt-[30px] text-space-black text-lg font-bold flex justify-between items-center">
            <div>{data?.reservationName}</div>
            <div className="cursor-pointer" onClick={() => setOpen(false)}>
              <img src="/reservation/modalCloseIcon.svg" alt="" />
            </div>
          </div>
          <div className="mt-8 flex gap-2 ">
            <div className="mt-1">
              <img src="/reservation/modaltime.svg" alt="" />
            </div>
            <div>
              <div className="text-space-black text-base font-semibold">
                {format(data?.startAt, 'MM.dd')} {date}
              </div>
              <div className="text-space-black text-sm font-medium">
                {' '}
                {format(data?.startAt, 'HH:mm')} - {format(data?.endAt, 'HH:mm')}
              </div>
            </div>
          </div>

          <div className="mt-[25px] pb-8 flex gap-2 border-b border-gray-300">
            <div className="mt-1">
              <img src="/reservation/modallocation.svg" alt="" />
            </div>
            <div>
              <div className="text-space-black text-base font-semibold">
                {data?.branchName} {data?.spaceName}
              </div>
              <div className="text-space-black text-sm font-medium">
                {data?.branchAddress}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <img src="/reservation/meetingicon.svg" alt="" />
            <div className="text-space-black font-semibold text-base">
              참석자 {1 + data?.participants.length}
            </div>
          </div>

          <div className="mx-3 mt-5 flex flex-col gap-4">
            <div className="flex items-center gap-[13px]">
              <div className="w-[42px] h-[42px] relative">
                <img
                  src={data?.representative?.imageUrl}
                  alt="image"
                  className="rounded-full w-[42px] h-[42px]"
                />
                <img
                  src="/reservation/groupLeader.svg"
                  alt=""
                  className="absolute bottom-0 right-0 z-[100]"
                />
              </div>
              <div className="flex flex-col ">
                <div className="text-space-black font-semibold text-base">
                  {data?.representative?.memberName}
                </div>
                <div className="text-gray-500 font-normal text-base">
                  {data?.representative?.memberEmail}
                </div>
              </div>
            </div>

            {data?.participants.map((member: participantsType, i: number) => (
              <div key={i} className="flex items-center gap-[13px]">
                <div className="w-[42px] h-[42px]">
                  <img
                    src={member.imageUrl}
                    alt="image"
                    className=" rounded-full w-[42px] h-[42px]"
                  />
                </div>
                <div className="flex flex-col ">
                  <div className="text-space-black font-semibold text-base">
                    {member.memberName}
                  </div>
                  <div className="text-gray-500 font-normal text-base">
                    {member.memberEmail}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailModal;
