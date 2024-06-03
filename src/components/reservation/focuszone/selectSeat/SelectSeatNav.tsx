import { useBranchStore } from '@/store/branch.store';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

const SelectSeatNav = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));

  const queryClient = useQueryClient();

  //todo branchId 받아오기
  const currentBranchId = '1';

  const handleRefresh = () => {
    queryClient.invalidateQueries(['seatInfo', currentBranchId]);
    setCurrentTime(format(new Date(), 'HH:mm'));
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
    <div className="flex items-center justify-between mt-[22px]">
      <div className="flex items-center gap-[7px]">
        <div>
          <img src="/reservation/location.svg" alt="" />
        </div>
        <div className="text-space-black font-semibold tesx-sm ">
          {selectedBranch?.branchName}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-[10px]">
          <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
          <div className="cursor-pointer" onClick={handleRefresh}>
            <img src="/reservation/focus_refresh.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeatNav;
