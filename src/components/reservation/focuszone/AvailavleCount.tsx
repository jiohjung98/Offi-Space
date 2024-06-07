import React from 'react';
import { useQuery } from 'react-query';
import { getFocuszoneSeatCount } from '../remote/focuszone';
import { useBranchStore } from '@/store/branch.store';

const AvailavleCount = () => {
  const { branchId } = useBranchStore((state) => state.selectedBranch) as {
    branchId: number;
  };

  //지오님작업 : 현재 useBranchStore(기존 메인페이지 지점)의 branchId로 실시간 좌석 현황을 받아오고있습니다
  // nav바, 내 주변에서 새롭게 지점이 설정되면 해당 지점의 id를 받아올 수 있게 해주시면 해주시면 되고,
  // nav바, 내 주변에서 지점 선택을 따로 하지 않았을시는 기존 그대로 useBranchStore의 branchId를 받아오면 됩니다
  // 가져와주시기만 하면 useQuery연결은 제가 작업하겠습니다.

  const { data } = useQuery(
    ['availableCount', branchId],
    () => getFocuszoneSeatCount(branchId),
    {
      enabled: !!branchId
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
