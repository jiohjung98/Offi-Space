import React from 'react';

interface SecondColSeatType {
  selectedSeat: string | null;
  handleSeatClick: (seatId: string) => void;
}

const SecondColSeat = ({ selectedSeat, handleSeatClick }: SecondColSeatType) => {
  return (
    <div>
      {/* 첫번째줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-t-[1.5px] border-gray-500">
            <div
              onClick={() => handleSeatClick('6')}
              id="6"
              className={`
              ${selectedSeat === '6' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
              6
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div
                onClick={() => handleSeatClick('7')}
                id="7"
                className={`
              ${selectedSeat === '7' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
                7
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-t-[1.5px] border-gray-500">
              <div
                onClick={() => handleSeatClick('8')}
                id="8"
                className={`
              ${selectedSeat === '8' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
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
              onClick={() => handleSeatClick('15')}
              id="15"
              className={`
              ${selectedSeat === '15' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-2 text-xs font-medium cursor-pointer`}>
              15
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => handleSeatClick('16')}
              id="16"
              className={`
              ${selectedSeat === '16' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
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
