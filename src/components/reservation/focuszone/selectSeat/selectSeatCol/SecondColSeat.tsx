/* eslint-disable no-unused-vars */
import { FocusSeatData } from '@/components/reservation/model/focusInfo';
import React, { useEffect, useState } from 'react';

interface SecondColSeatType {
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

const SecondColSeat = ({
  selectedSeat,
  handleSeatClick,
  allSeatInfo
}: SecondColSeatType) => {
  const renderedSeat = () => {
    const firstCol = ['6', '7', '8', '15', '16'];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSeatInfo]);
  return (
    <div>
      {/* 첫번째줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-t-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[0]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[0]?.focusDeskId,
                    deskNumber: '6'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[0]?.canReserve ? (selectedSeat === '6' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
              6
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div
                onClick={() => {
                  if (seatInfo[1]?.canReserve) {
                    handleSeatClick({
                      deskId: seatInfo[1]?.focusDeskId,
                      deskNumber: '7'
                    });
                  } else {
                    return;
                  }
                }}
                className={`
              ${seatInfo[1]?.canReserve ? (selectedSeat === '7' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
                7
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div
                onClick={() => {
                  if (seatInfo[2]?.canReserve) {
                    handleSeatClick({
                      deskId: seatInfo[2]?.focusDeskId,
                      deskNumber: '8'
                    });
                  } else {
                    return;
                  }
                }}
                className={`
              ${seatInfo[2]?.canReserve ? (selectedSeat === '8' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
                8
              </div>
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="mt-[16px] flex">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[3]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[3]?.focusDeskId,
                    deskNumber: '15'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[3]?.canReserve ? (selectedSeat === '15' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
              15
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[4]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[4]?.focusDeskId,
                    deskNumber: '16'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[4]?.canReserve ? (selectedSeat === '16' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
              16
            </div>
          </div>
        </div>
      </div>
      {/* 두번째줄 */}
      <div className="border-r-[1.5px] border-gray-500">
        <div className="w-1 h-[48px] bg-gray-300" />
      </div>
    </div>
  );
};

export default SecondColSeat;
