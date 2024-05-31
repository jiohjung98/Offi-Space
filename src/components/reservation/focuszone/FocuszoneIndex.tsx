import React from 'react';
import BgPurpleLay from './BgPurpleLay';
import FocuszoneHead from './FocuszoneHead';
import AvailableTitle from './AvailableTitle';
import AvailavleCount from './AvailavleCount';
import FocusInfo from './FocusInfo';
import FocusReservationBtn from './FocusReservationBtn';

const FocuszoneIndex = () => {
  return (
    <div className="mb-[100px]">
      <BgPurpleLay>
        <FocuszoneHead />
        <AvailableTitle />
      </BgPurpleLay>
      <AvailavleCount />
      <FocusInfo />
      <FocusReservationBtn />
    </div>
  );
};

export default FocuszoneIndex;
