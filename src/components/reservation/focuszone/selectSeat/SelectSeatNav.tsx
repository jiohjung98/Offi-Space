import { useBranchStore } from '@/store/branch.store';
import { useBranchStore2 } from '@/store/reserve.store';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

const SelectSeatNav = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
  const reservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);

  const currentBranch =
    updatedTimeSelected &&
    updatedTimeReserved &&
    updatedTimeSelected > updatedTimeReserved
      ? selectedBranch
      : reservedBranch;

  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    if (currentBranch?.branchId) {
      queryClient.invalidateQueries(['seatInfo', currentBranch?.branchId]);
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
    <div className="flex items-center justify-between mt-[22px]">
      <div className="flex items-center gap-[7px]">
        <div>
          <img src="/reservation/location.svg" alt="" />
        </div>
        <div className="text-space-black font-semibold tesx-sm ">
          {currentBranch?.branchName}
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
