import React from 'react';

interface FirstColSeatType {
  selectedSeat: string | null;
  handleSeatClick: (seatId: string) => void;
}

const FirstColSeat = ({ selectedSeat, handleSeatClick }: FirstColSeatType) => {
  return (
    <div>
      {/* 첫번째 줄 */}
      <div className="border-r-[1.5px] border-l-[1.5px] border-t-[1.5px] border-gray-500 w-full h-10 flex">
        <div className="ml-[86px] border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full cursor-pointer">
          <div
            id="1"
            onClick={() => handleSeatClick('1')}
            className={`
            ${selectedSeat === '1' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
            flex items-center justify-center rounded-md  h-full w-8 text-xs font-medium cursor-pointer`}>
            1
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            id="2"
            onClick={() => handleSeatClick('2')}
            className={`
            ${selectedSeat === '2' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
            flex items-center justify-center rounded-md  h-full w-8 text-xs font-medium cursor-pointer`}>
            2
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            id="3"
            onClick={() => handleSeatClick('3')}
            className={`
            ${selectedSeat === '3' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
            flex items-center justify-center rounded-md  h-full w-8 text-xs font-medium cursor-pointer`}>
            3
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => handleSeatClick('4')}
            id="4"
            className={`
            ${selectedSeat === '4' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
            flex items-center justify-center rounded-md  h-full w-8 text-xs font-medium cursor-pointer`}>
            4
          </div>
        </div>
        <div className="border-l-[1.5px] border-gray-500 pt-[5px] px-[11px] h-full">
          <div
            onClick={() => handleSeatClick('5')}
            id="5"
            className={`
            ${selectedSeat === '5' ? 'bg-space-purple text-white' : 'bg-space-purple-light text-space-black'}
            flex items-center justify-center rounded-md  h-full w-8 text-xs font-medium cursor-pointer`}>
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
