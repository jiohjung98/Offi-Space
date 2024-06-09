import { format } from 'date-fns';
import React, { Dispatch, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { SelectedState } from './RechargingRoomIndex';

interface RechargingHeadType {
  branchId: number;
  count: number;
  setIsSelected: Dispatch<React.SetStateAction<SelectedState>>;
}

const RechargingHead = ({ branchId, count, setIsSelected }: RechargingHeadType) => {
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    if (branchId) {
      setIsSelected({
        rechargingRoomId: 0,
        startAt: '',
        rechargingRoomName: ''
      });
      queryClient.invalidateQueries(['rechargingRooms', branchId]);
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
    <div className="mt-5 flex items-center justify-between mx-4">
      <div className="text-space-black text-sm font-normal">총 {count}개의 공간</div>
      <div className="flex items-center gap-[10px]">
        <div className="text-gray-600 text-sm font-normal">{currentTime} 기준</div>
        <div className="cursor-pointer" onClick={handleRefresh}>
          <img src="reservation/focus_refresh.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RechargingHead;
