/* eslint-disable no-unused-vars */
import React, { Dispatch } from 'react';

interface SelectSeatBtnType {
  selectedSeat: string | null;
  currentDeskId: number | null;
  setSelectedSeat: Dispatch<React.SetStateAction<string | null>>;
  mutateAsync: (deskId: number) => Promise<void>;
}

const SelectSeatBtn = ({
  selectedSeat,
  currentDeskId,
  setSelectedSeat,
  mutateAsync
}: SelectSeatBtnType) => {
  return (
    <div className="mt-6">
      {selectedSeat ? (
        <>
          <div className="flex items-center justify-center text-base font-medium text-space-black">
            선택한 좌석은
            <span className="text-space-purple px-1 font-semibold">
              {' '}
              {selectedSeat}번 좌석{' '}
            </span>
            입니다.
          </div>
          <div
            onClick={() => {
              if (currentDeskId) {
                setSelectedSeat(null);
                mutateAsync(currentDeskId);
              }
            }}
            className="cursor-pointer mt-[30px] w-full py-[13px] rounded-lg bg-space-purple flex items-center justify-center font-normal text-[15px] text-white">
            예약 확정
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center text-base font-medium text-space-black">
            좌석을 선택해주세요.
          </div>
          <div className="mt-[30px] w-full py-[13px] rounded-lg border border-gray-400 flex items-center justify-center font-normal text-[15px] text-gray-500">
            예약
          </div>
        </>
      )}
    </div>
  );
};

export default SelectSeatBtn;
