import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useQueryClient } from 'react-query';

const FocuszoneHead = () => {
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const queryClient = useQueryClient();

  //todo branchId 받아오기
  const currentBranchId = '1';

  const handleRefresh = () => {
    queryClient.invalidateQueries(['availableCount', currentBranchId]);
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
      <div onClick={handleRefresh} className="flex items-center gap-[10px]">
        <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
        <div
          className="cursor-pointer"
          onClick={() => setCurrentTime(format(new Date(), 'HH:mm'))}>
          <img src="reservation/focus_refresh.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FocuszoneHead;
