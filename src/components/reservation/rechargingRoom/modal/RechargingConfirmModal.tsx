import React, { Dispatch } from 'react';
import { useRouter } from 'next/router';
import { useBranchStore } from '@/store/branch.store';
import { useBranchStore2 } from '@/store/reserve.store';
import { SelectedState } from '../RechargingRoomIndex';
import { addMinutes, format } from 'date-fns';

interface RechargingConfirmModalType {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  isSelected: SelectedState;
}

const RechargingConfirmModal = ({
  setOpenModal,
  isSelected
}: RechargingConfirmModalType) => {
  const router = useRouter();

  const selectedBranch = useBranchStore(
    (state: { selectedBranch: any }) => state.selectedBranch
  );
  const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
  const reservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);

  const currentBranch =
    updatedTimeSelected &&
    updatedTimeReserved &&
    updatedTimeSelected > updatedTimeReserved
      ? selectedBranch
      : reservedBranch;

  const branchName = currentBranch?.branchName;
  const formattedStartAt = isSelected.startAt
    ? format(new Date(), 'MM.dd ') + isSelected.startAt
    : '';

  const startTime = isSelected.startAt
    ? new Date(`2000-01-01T${isSelected.startAt}`)
    : new Date();
  const endTime = addMinutes(startTime, 30);
  const formattedEndTime = format(endTime, 'HH:mm');

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[99999]">
      <div className="z-50 w-[310px] bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="flex items-center justify-center mt-[25px]">
          <img src="/reservation/confirmReservation.svg" alt="" />
        </div>
        <div className="text-space-black font-bold text-lg flex items-center justify-center mt-4">
          예약이 완료되었습니다.
        </div>
        <div className="mt-[46px] flex flex-col gap-5">
          <div className="flex items-center justify-between mx-[30px] text-md">
            <div className="text-gray-700 font-normal">일정명</div>
            <div className="text-space-purple font-semibold">리차징룸</div>
          </div>
          <div className="flex items-center justify-between mx-[30px] text-md">
            <div className="text-gray-700 font-normal">예약 시간</div>
            <div className="text-space-purple font-semibold">
              {formattedStartAt} ~ {formattedEndTime}
            </div>
          </div>
          <div className="flex items-center justify-between mx-[30px] text-md">
            <div className="text-gray-700 font-normal">예약한 지점</div>
            <div className="text-space-purple font-semibold">{branchName}</div>
          </div>
          <div className="flex items-center justify-between mx-[30px] text-md">
            <div className="text-gray-700 font-normal">예약한 공간</div>
            <div className="text-space-purple font-semibold">
              {isSelected?.rechargingRoomName}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-300 flex cursor-pointer">
          <div
            onClick={() => {
              setOpenModal(false);
              router.replace('/');
            }}
            className="border-r border-gray-300 flex-1 flex items-center justify-center py-[15px] text-gray-600 font-normal text-lg">
            홈으로
          </div>
          <div
            onClick={() => {
              setOpenModal(false);
              router.replace('/reservation/myreservationlist');
            }}
            className="flex-1 flex items-center justify-center py-[15px] text-lg font-semibold text-space-purple">
            예약 상세
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargingConfirmModal;
