import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useQueryClient } from 'react-query';
import { useBranchStore } from '@/store/branch.store';

const FocuszoneHead = () => {
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const queryClient = useQueryClient();

  //지오님 작업 : branchId 받아오기
  const { branchId } = useBranchStore((state) => state.selectedBranch) as {
    branchId: number;
  };

  const handleRefresh = () => {
    if (branchId) {
      queryClient.invalidateQueries(['availableCount', branchId]);
      setCurrentTime(format(new Date(), 'HH:mm'));
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCurrentTime(format(new Date(), 'HH:mm'));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex justify-between items-center pt-5">
      <div className="font-semibold text-lg">
        <span className="text-space-purple font-bold">실시간 </span>
        <span className="text-space-black">좌석 현황</span>
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
        <div className="cursor-pointer" onClick={handleRefresh}>
          <img src="reservation/focus_refresh.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FocuszoneHead;
