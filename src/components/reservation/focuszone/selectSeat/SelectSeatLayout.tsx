import React from 'react';
import FirstColSeat from './selectSeatCol/FirstColSeat';
import SecondColSeat from './selectSeatCol/SecondColSeat';
import ThirdColSeat from './selectSeatCol/ThirdColSeat';
import SeatInfo from './SeatInfo';
import SelectSeatBtn from './SelectSeatBtn';

const SelectSeatLayout = () => {
  return (
    <div>
      <div className="mt-8 bg-gray-50">
        <FirstColSeat />
        <SecondColSeat />
        <ThirdColSeat />
      </div>
      <SeatInfo />
      <SelectSeatBtn />
    </div>
  );
};

export default SelectSeatLayout;
