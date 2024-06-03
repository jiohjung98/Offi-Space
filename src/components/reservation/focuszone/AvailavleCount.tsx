import React from 'react';
import { useQuery } from 'react-query';
import { getFocuszoneSeatCount } from '../remote/focuszone';

const AvailavleCount = () => {
  //todo branchId 받아오기
  const currentBranchId = '1';
  const { data } = useQuery(
    ['availableCount', currentBranchId],
    () => getFocuszoneSeatCount(currentBranchId),
    {
      enabled: !!currentBranchId
    }
  );

  return (
    <div
      style={{
        boxShadow: '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)'
      }}
      className="pb-[30px] border-r border-l border-b border-gray-200 rounded-b flex items-center mx-4">
      <div className="border-r-2 border-space-purple-light text-gray-300 text-[26px] font-medium w-[120px] flex items-center justify-center ml-[0.25px]">
        {data?.reservedSeatCount}
      </div>
      <div className="border-r-2 border-space-purple-light text-yellow-400 text-[26px] font-bold w-[120.25px] flex items-center justify-center">
        {data?.availableSeatCount}
      </div>
      <div className=" text-slate-500 text-[26px] font-medium w-[118px] flex items-center justify-center">
        {data?.totalSeatCount}
      </div>
    </div>
  );
};

export default AvailavleCount;
