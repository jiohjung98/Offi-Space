import React from 'react';

interface RechargingBtnType {
  isSelected: boolean;
}

const RechargingBtn = ({ isSelected }: RechargingBtnType) => {
  return (
    <div
      className={`
    ${isSelected ? 'bg-space-purple text-white' : 'border border-gray-400 text-gray-600'}
    mt-[45px] flex text-[16px] font-normal items-center justify-center w-[361px] h-12 mx-4  rounded-lg
`}>
      {isSelected ? '예약 확정' : '예약'}
    </div>
  );
};

export default RechargingBtn;
