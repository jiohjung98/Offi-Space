/* eslint-disable no-unused-vars */
import { FocusSeatData } from '@/components/reservation/model/focusInfo';
import React, { useEffect, useState } from 'react';

interface ThirdColSeatType {
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

const ThirdColSeat = ({
  selectedSeat,
  handleSeatClick,
  allSeatInfo
}: ThirdColSeatType) => {
  const renderedSeat = () => {
    const firstCol = ['9', '10', '11', '17', '18', '12', '13', '14', '19', '20'];
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
      {/* 첫번째 줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-b-[1.5px] border-gray-500 ">
            <div
              onClick={() => {
                if (seatInfo[0]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[0]?.focusDeskId,
                    deskNumber: '9'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[0]?.canReserve ? (selectedSeat === '9' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              9
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div
              onClick={() => {
                if (seatInfo[1]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[1]?.focusDeskId,
                    deskNumber: '10'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[1]?.canReserve ? (selectedSeat === '10' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              10
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div
              onClick={() => {
                if (seatInfo[2]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[2]?.focusDeskId,
                    deskNumber: '11'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[2]?.canReserve ? (selectedSeat === '11' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              11
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[3]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[3]?.focusDeskId,
                    deskNumber: '17'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[3]?.canReserve ? (selectedSeat === '17' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              17
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[4]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[4]?.focusDeskId,
                    deskNumber: '18'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[4]?.canReserve ? (selectedSeat === '18' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              18
            </div>
          </div>
        </div>
      </div>

      {/* 두번째줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className=" border-gray-500 ">
            <div
              onClick={() => {
                if (seatInfo[5]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[5]?.focusDeskId,
                    deskNumber: '12'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[5]?.canReserve ? (selectedSeat === '12' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              12
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div
                onClick={() => {
                  if (seatInfo[6]?.canReserve) {
                    handleSeatClick({
                      deskId: seatInfo[6]?.focusDeskId,
                      deskNumber: '13'
                    });
                  } else {
                    return;
                  }
                }}
                className={`
                ${seatInfo[6]?.canReserve ? (selectedSeat === '13' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
                w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
                13
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div
                onClick={() => {
                  if (seatInfo[7]?.canReserve) {
                    handleSeatClick({
                      deskId: seatInfo[7]?.focusDeskId,
                      deskNumber: '14'
                    });
                  } else {
                    return;
                  }
                }}
                className={`
              ${seatInfo[7]?.canReserve ? (selectedSeat === '14' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
                14
              </div>
            </div>
            <div className="flex-1" />
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex mt-[44px]">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[8]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[8]?.focusDeskId,
                    deskNumber: '19'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[8]?.canReserve ? (selectedSeat === '19' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              19
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => {
                if (seatInfo[9]?.canReserve) {
                  handleSeatClick({
                    deskId: seatInfo[9]?.focusDeskId,
                    deskNumber: '20'
                  });
                } else {
                  return;
                }
              }}
              className={`
              ${seatInfo[9]?.canReserve ? (selectedSeat === '20' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black') : 'bg-gray-500 text-gray-200'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              20
            </div>
          </div>
        </div>
      </div>
      {/* 세번째줄 */}
      <div className="h-[25px] border-x-[1.5px] border-gray-500 flex">
        <div className="border-b-[1.5px] border-gray-500 w-28" />
        <div className="font-semibold text-xs text-gray-500 w-[72px] flex justify-center">
          Entrance
        </div>
        <div className="border-b-[1.5px] border-gray-500 flex-1" />
      </div>
    </div>
  );
};

export default ThirdColSeat;
