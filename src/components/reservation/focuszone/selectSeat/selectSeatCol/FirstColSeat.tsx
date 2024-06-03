/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { FocusSeatData } from '@/components/reservation/model/focusInfo';
import React, { useEffect, useState } from 'react';

interface FirstColSeatType {
  selectedSeat: string | null;
  handleSeatClick: ({
    deskId,
    deskNumber
  }: {
    deskId: number;
    deskNumber: string;
  }) => void;
  allSeatInfo: FocusSeatData[];
}

const FirstColSeat = ({
  selectedSeat,
  handleSeatClick,
  allSeatInfo
}: FirstColSeatType) => {
  const renderedSeat = () => {
    const firstCol = ['1', '2', '3', '4', '5'];
    const selectedNum: FocusSeatData[] = [];
    firstCol.forEach((col) => {
      const matchingSeat = allSeatInfo?.find(
        (seat) => seat.focusDeskNumber.toString() === col
      );
      if (matchingSeat) {
        selectedNum.push(matchingSeat);
      }
    });
    return selectedNum;
  };

  const [seatInfo, setSeatInfo] = useState<FocusSeatData[]>([]);

  useEffect(() => {
    setSeatInfo(renderedSeat());
  }, [allSeatInfo]);

  return (
    <div>
      {/* 첫번째 줄 */}
      <div className="border-r-[1.5px] border-l-[1.5px] border-t-[1.5px] border-gray-500 w-full h-10 flex">
        <div className="ml-[86px] border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full cursor-pointer">
          <div
            onClick={() => {
              if (seatInfo[0]?.canReserve) {
                handleSeatClick({
                  deskId: seatInfo[0]?.focusDeskId,
                  deskNumber: '1'
                });
              } else {
                return;
              }
            }}
            className={`
    ${seatInfo[0]?.canReserve ? (selectedSeat === '1' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
    flex items-center justify-center rounded-md h-full w-8 text-xs font-medium cursor-pointer`}>
            1
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => {
              if (seatInfo[1]?.canReserve) {
                handleSeatClick({
                  deskId: seatInfo[1]?.focusDeskId,
                  deskNumber: '2'
                });
              } else {
                return;
              }
            }}
            className={`
    ${seatInfo[1]?.canReserve ? (selectedSeat === '2' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
    flex items-center justify-center rounded-md h-full w-8 text-xs font-medium cursor-pointer`}>
            2
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => {
              if (seatInfo[2]?.canReserve) {
                handleSeatClick({
                  deskId: seatInfo[2]?.focusDeskId,
                  deskNumber: '3'
                });
              } else {
                return;
              }
            }}
            className={`
    ${seatInfo[2]?.canReserve ? (selectedSeat === '3' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
    flex items-center justify-center rounded-md h-full w-8 text-xs font-medium cursor-pointer`}>
            3
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => {
              if (seatInfo[3]?.canReserve) {
                handleSeatClick({
                  deskId: seatInfo[3]?.focusDeskId,
                  deskNumber: '4'
                });
              } else {
                return;
              }
            }}
            className={`
    ${seatInfo[3]?.canReserve ? (selectedSeat === '4' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
    flex items-center justify-center rounded-md h-full w-8 text-xs font-medium cursor-pointer`}>
            4
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => {
              if (seatInfo[4]?.canReserve) {
                handleSeatClick({
                  deskId: seatInfo[4]?.focusDeskId,
                  deskNumber: '5'
                });
              } else {
                return;
              }
            }}
            className={`
    ${seatInfo[4]?.canReserve ? (selectedSeat === '5' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
    flex items-center justify-center rounded-md h-full w-8 text-xs font-medium cursor-pointer`}>
            5
          </div>
        </div>
      </div>
      <div className="w-full border-r-[1.5px] border-gray-500 text-gray-500 font-semibold text-xs pl-1 py-5">
        Entrance
      </div>
      <div className="border-x-[1.5px] border-gray-500 flex items-center justify-between">
        {/* 왼쪽 */}
        <div className="flex flex-col">
          <div className="h-5" />
          <div className=" w-[112px] h-[42px] bg-gray-200 text-gray-500 text-xs font-semibold flex items-center justify-center">
            Locker
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex border-b-[1.5px] border-gray-500 mt-5">
          <div className="w-[23px]" />
          <div className="border-l-[1.5px] border-gray-500">
            <div className="flex justify-between">
              <div className="h-5 w-[35px] border-t-[1.5px] border-gray-500" />
              <div className="h-5 w-[35px] border-t-[1.5px] border-gray-500" />
            </div>
            <div className="w-[113px] h-[22px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold ">
              Service Bar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstColSeat;
