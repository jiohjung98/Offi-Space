import React, { useState } from 'react';
import FirstColSeat from './selectSeatCol/FirstColSeat';
import SecondColSeat from './selectSeatCol/SecondColSeat';
import ThirdColSeat from './selectSeatCol/ThirdColSeat';
import SeatInfo from './SeatInfo';
import SelectSeatBtn from './SelectSeatBtn';

const SelectSeatLayout = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seatId: string) => {
    if (selectedSeat === seatId) {
      setSelectedSeat(null); // 선택된 좌석을 다시 클릭하면 선택 해제
    } else {
      setSelectedSeat(seatId); // 새로운 좌석 선택
    }
  };
  return (
    <div>
      <div className="mt-8 bg-gray-50">
        <FirstColSeat selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} />
        <SecondColSeat selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} />
        <ThirdColSeat selectedSeat={selectedSeat} handleSeatClick={handleSeatClick} />
      </div>
      <SeatInfo />
      <SelectSeatBtn selectedSeat={selectedSeat} />
    </div>
  );
};

export default SelectSeatLayout;
