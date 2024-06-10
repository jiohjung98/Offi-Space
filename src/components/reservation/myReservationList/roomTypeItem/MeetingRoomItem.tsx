'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useCallback } from 'react';
import { todayListData } from '../../model/myreservation';
import { format } from 'date-fns';
import Image from 'next/image';

interface MeetingRoomItemType {
  roomData: todayListData;
}

const MeetingRoomItem = ({ roomData }: MeetingRoomItemType) => {
  const { setOpen, setReservationId, setIsMeeting } = useReservationStore();

  const renderUserImg = useCallback(() => {
    if (roomData?.memberImageUrls.length <= 3) {
      return (
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {roomData?.memberImageUrls.map((userImg: string, i) => (
            <Image
              width={40}
              height={40}
              key={i}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={userImg}
              alt="userimg"
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {roomData?.memberImageUrls
            .slice(0, 3)
            .map((userImg: string, i) => (
              <Image
                width={40}
                height={40}
                key={i}
                className="w-10 h-10 border-2 border-white rounded-full"
                src={userImg}
                alt="userimg"
              />
            ))}
          <div className="relative">
            <Image
              width={40}
              height={40}
              className=" w-10 h-10 border-2 border-white rounded-full brightness-50 opacity-80 "
              src={roomData?.memberImageUrls[3]}
              alt="userimg"
            />
            <div className="absolute z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              {' '}
              +{roomData?.memberImageUrls.length - 3}
            </div>
          </div>
        </div>
      );
    }
  }, []);

  return (
    <div
      onClick={() => {
        setOpen(true);
        setIsMeeting(true);
        setReservationId(roomData?.reservationId);
      }}
      className="border-b border-gray-300 py-4 cursor-pointer">
      <div className="mx-4 flex items-center justify-between">
        {/* 고정 */}
        <div className="flex gap-2 items-center">
          <div className="w-[3px] h-[72px] bg-yellow-400" />
          <div className="flex flex-col gap-2">
            <div className="text-space-black text-md font-semibold">
              {roomData?.reservationName}
            </div>
            <div className="flex flex-col text-sm font-normal text-gray-500">
              {/* 변경 필요 */}
              <div>
                {roomData?.branchName} {roomData?.spaceName}
              </div>
              <div>
                {format(roomData?.startAt, 'HH:mm')} - {format(roomData?.endAt, 'HH:mm')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[17px]">
          {/* 참석자인지, 호스트인지 구분 */}
          <div className="flex justify-end">
            {roomData?.memberType == 'REPRESENTATIVE' ? (
              <div className="flex items-center justify-center w-[46px] h-6 text-center border-2 border-space-blue rounded-[20px] text-white bg-space-blue text-[12px] font-semibold">
                호스트
              </div>
            ) : (
              <div className="flex items-center justify-center w-[46px] h-6 text-center border-2 border-space-blue rounded-[20px] text-space-blue text-[12px] font-semibold">
                참석자
              </div>
            )}
          </div>
          {/* 미팅룸 참석자 이미지 */}
          {renderUserImg()}
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomItem;
