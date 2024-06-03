import React, { Dispatch, useState } from 'react';
import FirstColSeat from './selectSeatCol/FirstColSeat';
import SecondColSeat from './selectSeatCol/SecondColSeat';
import ThirdColSeat from './selectSeatCol/ThirdColSeat';
import SeatInfo from './SeatInfo';
import SelectSeatBtn from './SelectSeatBtn';
import { useQuery } from 'react-query';
import { getFocuszoneSeatInfo } from '../../remote/focuszone';

interface SelectSeatLayoutType {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const SelectSeatLayout = ({ setModalOpen }: SelectSeatLayoutType) => {
  // focusTodo : 받아온 예약 데이터에 따라 배치표에 표시하기
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const currentBranchId = '1';
  const { data: allSeatInfo } = useQuery(
    ['seatInfo', currentBranchId],
    () => getFocuszoneSeatInfo(currentBranchId),
    {
      enabled: !!currentBranchId
    }
  );

  const handleSeatClick = (seatId: string) => {
    console.log('asdasd');
    if (selectedSeat === seatId) {
      setSelectedSeat(null); // 선택된 좌석을 다시 클릭하면 선택 해제
    } else {
      setSelectedSeat(seatId); // 새로운 좌석 선택
    }
  };
  return (
    <div>
      <div className="mt-8 bg-gray-50">
        <FirstColSeat
          allSeatInfo={allSeatInfo && allSeatInfo}
          selectedSeat={selectedSeat}
          handleSeatClick={handleSeatClick}
        />
        <SecondColSeat
          allSeatInfo={allSeatInfo && allSeatInfo}
          selectedSeat={selectedSeat}
          handleSeatClick={handleSeatClick}
        />
        <ThirdColSeat
          allSeatInfo={allSeatInfo && allSeatInfo}
          selectedSeat={selectedSeat}
          handleSeatClick={handleSeatClick}
        />
      </div>
      <SeatInfo />
      <SelectSeatBtn selectedSeat={selectedSeat} setModalOpen={setModalOpen} />
    </div>
  );
};

export default SelectSeatLayout;
