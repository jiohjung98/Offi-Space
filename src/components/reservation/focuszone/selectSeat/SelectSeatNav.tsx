import { useBranchStore } from '@/store/branch.store';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const SelectSeatNav = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));

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
          {/* todo : 지정 안되어 있을때는 강남점으로 지정 */}
          {selectedBranch?.branchName}
        </div>
      </div>
      <div>
        {/* todo : 새로고침 눌렀을 때 실시간 좌석 현황 다시 받아오기 */}
        <div className="flex items-center gap-[10px]">
          <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
          <div
            className="cursor-pointer"
            onClick={() => setCurrentTime(format(new Date(), 'HH:mm'))}>
            <img src="/reservation/focus_refresh.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeatNav;
