import React from 'react';

interface ThirdColSeatType {
  selectedSeat: string | null;
  handleSeatClick: (seatId: string) => void;
}

const ThirdColSeat = ({ selectedSeat, handleSeatClick }: ThirdColSeatType) => {
  return (
    <div>
      {/* 첫번째 줄 */}
      <div className="border-x-[1.5px] border-gray-500 flex justify-between">
        {/* 왼쪽 */}
        <div className="flex">
          <div className="border-b-[1.5px] border-gray-500 ">
            <div
              onClick={() => handleSeatClick('9')}
              id="9"
              className={`
              ${selectedSeat === '9' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              9
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div
              onClick={() => handleSeatClick('10')}
              id="10"
              className={`
              ${selectedSeat === '10' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              10
            </div>
          </div>
          <div className="border-b-[1.5px] border-l-[1.5px] border-gray-500 ">
            <div
              onClick={() => handleSeatClick('11')}
              id="11"
              className={`
              ${selectedSeat === '11' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              11
            </div>
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex">
          <div className="border-l-[1.5px] border-t-[1.5px] border-r-[1.5px] border-gray-500">
            <div
              onClick={() => handleSeatClick('17')}
              id="17"
              className={`
              ${selectedSeat === '17' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              17
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => handleSeatClick('18')}
              id="18"
              className={`
              ${selectedSeat === '18' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
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
              onClick={() => handleSeatClick('12')}
              id="12"
              className={`
              ${selectedSeat === '12' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              12
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div
                onClick={() => handleSeatClick('13')}
                id="13"
                className={`
              ${selectedSeat === '13' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
                13
              </div>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex flex-col">
            <div className="border-l-[1.5px] border-gray-500">
              <div
                onClick={() => handleSeatClick('14')}
                id="14"
                className={`
              ${selectedSeat === '14' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
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
              onClick={() => handleSeatClick('19')}
              id="19"
              className={`
              ${selectedSeat === '19' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
              w-8 h-8 flex items-center rounded-md justify-center mx-[13px] my-[6px]  text-xs font-medium cursor-pointer`}>
              19
            </div>
          </div>
          <div className="border-b-[1.5px] border-gray-500">
            <div
              onClick={() => handleSeatClick('20')}
              id="20"
              className={`
              ${selectedSeat === '20' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
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
