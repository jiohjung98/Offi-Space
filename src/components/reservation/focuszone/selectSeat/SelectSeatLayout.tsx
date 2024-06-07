import React, { Dispatch, useState } from 'react';
import FirstColSeat from './selectSeatCol/FirstColSeat';
import SecondColSeat from './selectSeatCol/SecondColSeat';
import ThirdColSeat from './selectSeatCol/ThirdColSeat';
import SeatInfo from './SeatInfo';
import SelectSeatBtn from './SelectSeatBtn';
import { useMutation, useQuery } from 'react-query';
import {
  checkDeskId,
  getFocuszoneSeatInfo,
  reservationFocus
} from '../../remote/focuszone';

interface SelectSeatLayoutType {
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setModalDeskId: Dispatch<React.SetStateAction<number | null>>;
  setCheckModal: Dispatch<React.SetStateAction<boolean>>;
  setModalDeskNumber: Dispatch<React.SetStateAction<string | null>>;
  branchId: number;
}

const SelectSeatLayout = ({
  branchId,
  setModalOpen,
  setModalDeskId,
  setCheckModal,
  setModalDeskNumber
}: SelectSeatLayoutType) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [currentDeskId, setCurrentDeskId] = useState<number | null>(null);

  const { data: allSeatInfo } = useQuery(
    ['seatInfo', branchId],
    () => getFocuszoneSeatInfo(branchId),
    {
      enabled: !!branchId
    }
  );

  const { mutateAsync } = useMutation(
    async (deskId: number) => reservationFocus(deskId),
    {
      onSuccess: () => {
        setModalOpen(true);
      }
    }
  );

  const handleSeatClick = async ({
    deskId, //좌석 Id
    deskNumber // 좌석 번호
  }: {
    deskId: number;
    deskNumber: string;
  }) => {
    const { alreadyUsing } = await checkDeskId(deskId);
    if (!alreadyUsing) {
      //예약한 좌석 없을 때
      if (selectedSeat === deskNumber) {
        setSelectedSeat(null); // 선택된 좌석을 다시 클릭하면 선택 해제
        setCurrentDeskId(null);
        setModalDeskNumber(null);
      } else {
        setSelectedSeat(deskNumber); // 새로운 좌석 선택
        setCurrentDeskId(deskId);
        setModalDeskNumber(deskNumber);
      }
    } else {
      setModalDeskId(deskId);
      setModalDeskNumber(deskNumber);
      setCheckModal(true);
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
      <SelectSeatBtn
        selectedSeat={selectedSeat}
        currentDeskId={currentDeskId}
        setSelectedSeat={setSelectedSeat}
        mutateAsync={mutateAsync}
      />
    </div>
  );
};

export default SelectSeatLayout;
