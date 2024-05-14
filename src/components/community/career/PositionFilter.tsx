import React, { useState } from 'react';

const PositionFilter = () => {
  //todo : user 정보 중 직무를 가져와서 useState 초기값에 넣어준다

  const [jobPosition, setJobPosition] = useState('디자인');

  return (
    <div className="w-[361px] mt-[32px] mx-[16px] h-12 bg-stone-50 rounded-lg flex items-center cursor-pointer">
      <div className="border-r-2 border-neutral-300 ml-[12px]">
        <div className="pr-[12px]">내 관심 직무</div>
      </div>
      <div className="flex-1 ml-[92px]">
        {/* todo : #1 */}
        <span className="text-space-purple font-extrabold">{jobPosition}</span>
      </div>
      <div className="flex justify-center items-center mr-2">
        <img src="/community/toBottom.png" alt="" />
      </div>
    </div>
  );
};

export default PositionFilter;
