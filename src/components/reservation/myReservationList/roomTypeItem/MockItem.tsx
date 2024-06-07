'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useReservationStore } from '@/store/reservationModal.store';
import React, { useCallback } from 'react';

const MockItem = () => {
  const { setOpen, setReservationId, setIsMeeting } = useReservationStore();
  const memberImg = [
    '/reservation/mockProfile.jpg',
    '/reservation/mockProfile.jpg',
    '/reservation/mockProfile.jpg',
    '/reservation/mockProfile.jpg'
  ];

  const renderUserImg = useCallback(() => {
    if (memberImg.length <= 3) {
      return (
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {memberImg.map((userImg: string, i) => (
            <img
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
          {memberImg.slice(0, 3).map((userImg: string, i) => (
            <img
              key={i}
              className="w-10 h-10 border-2 border-white rounded-full"
              src={userImg}
              alt="userimg"
            />
          ))}
          <div className="relative">
            <img
              className=" w-10 h-10 border-2 border-white rounded-full brightness-50 opacity-80 "
              src={memberImg[3]}
              alt="userimg"
            />
            <div className="absolute z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              {' '}
              +{memberImg.length - 3}
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
        setReservationId(1);
      }}
      className="border-b border-gray-300 py-4 cursor-pointer">
      <div className="mx-4 flex items-center justify-between">
        {/* 고정 */}
        <div className="flex gap-2 items-center">
          <div className="w-[3px] h-16 bg-yellow-400" />
          <div className="flex flex-col gap-2">
            <div className="text-space-black text-md font-semibold">
              UXUI 팀 기획안 공유 건
            </div>
            <div className="flex flex-col text-sm font-normal text-gray-500">
              {/* 변경 필요 */}
              <div>광화문점 미팅룸 스테이트89</div>
              <div>10:00 - 13:00</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[17px]">
          {/* 참석자인지, 호스트인지 구분 */}
          <div className="flex justify-end">
            <div className="flex items-center justify-center w-[46px] h-6 text-center border-2 border-space-blue rounded-[20px] text-white bg-space-blue text-[12px] font-semibold">
              호스트
            </div>
          </div>
          {/* 미팅룸 참석자 이미지 */}
          {renderUserImg()}
        </div>
      </div>
    </div>
  );
};

export default MockItem;
