'use client';
import { useBranchStore } from '@/store/branch.store';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getAllAvailableCount } from './remote/mainReservation';
import { useRouter } from 'next/router';
import { getSelectedOfficeInfo } from '@/api/map/getSelectedOffice';
import { useBranchStore2 } from '@/store/reserve.store';

const AvailableRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const { setReservedBranch } = useBranchStore2();

  const { data } = useQuery(
    ['AllAvailableCount', selectedBranch?.branchId],
    () => getAllAvailableCount(selectedBranch?.branchId as number),
    {
      enabled: !!selectedBranch?.branchId
    }
  );

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

  const handleGoToReservation = async () => {
    try {
      const data = await getSelectedOfficeInfo(selectedBranch!.branchName);
      if (data.data) {
        setReservedBranch(data?.data, Date.now());
        router.push({
          pathname: '/reservation',
        });
      }
    } catch (error) {
      console.error('Error updating selected branch:', error);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="pb-10">
      {/* 상단 */}
      <div className="flex justify-between items-center">
        <div className="text-gray-800 font-bold text-xl ">예약 가능한 공간</div>
        <div className="text-gray-400 text-sm font-normal flex justify-center items-center gap-1">
          <div>{currentTime} 기준</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              queryClient.invalidateQueries([
                'AllAvailableCount',
                selectedBranch?.branchId
              ]);
              setCurrentTime(format(new Date(), 'HH:mm'));
            }}>
            <img src="/home/refresh.svg" alt="" />
          </div>
        </div>
      </div>

      {/* 중간 */}
      <div className="flex gap-[76px] items-center justify-center mt-6">
        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/M_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">미팅룸</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">
                {data?.availableMeetingRoomCount}
              </span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">
              {data?.totalMeetingRoomCount}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/R_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">리차징룸</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">
                {data?.availableRechargingRoomCount}
              </span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">
              {data?.totalRechargingRoomCount}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[13px] items-center justify-center">
          <div>
            <img src="/home/G_Room.svg" alt="" />
          </div>
          <div className="text-gray-600 text-sm font-normal ">포커스존</div>
          <div className="flex justify-center items-center gap-1">
            <div>
              <span className="text-space-purple text-[26px] font-medium">
                {data?.availableFocusDeskCount}
              </span>
            </div>
            <div>
              <img src="/home/slash.svg" alt="" />
            </div>
            <div className="text-gray-400 font-medium text-base">
              {data?.totalFocusDeskCount}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div
        className="cursor-pointer mt-8 rounded-lg w-full h-12 border-2 border-space-purple flex justify-center items-center text-space-purple text-[15px] font-semibold" onClick={handleGoToReservation}>
        예약하기
      </div>
    </div>
  );
};

export default AvailableRoom;
