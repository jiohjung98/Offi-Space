import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRechargingRoom } from '../remote/recharging';
import { useBranchStore } from '@/store/branch.store';
import { useBranchStore2 } from '@/store/reserve.store';
import RechargingHead from './RechargingHead';
import RechargingRoomItem from './RechargingRoomItem';
import { rechargingRoomDataType } from '../model/recharging';
import RechargingBtn from './RechargingBtn';
import RechargingConfirmModal from './modal/RechargingConfirmModal';

export interface SelectedState {
  rechargingRoomId: number;
  startAt: string;
  rechargingRoomName?: string;
}

const RechargingRoomIndex = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
  const reservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);

  const [openModal, setOpenModal] = useState(false);
  const [isSelected, setIsSelected] = useState<SelectedState>({
    rechargingRoomId: 0,
    startAt: '',
    rechargingRoomName: ''
  });

  const currentBranch =
    updatedTimeSelected &&
    updatedTimeReserved &&
    updatedTimeSelected > updatedTimeReserved
      ? selectedBranch
      : reservedBranch || selectedBranch;

  const branchId = currentBranch?.branchId as number;

  const { data } = useQuery(
    ['rechargingRooms', branchId],
    () => getRechargingRoom(branchId),
    {
      enabled: !!branchId
    }
  );

  if (data == undefined || data?.status == 'FAIL') {
    return null;
  }

  return (
    <div>
      <RechargingHead
        branchId={branchId}
        count={data?.length}
        setIsSelected={setIsSelected}
      />
      {data?.map((item: rechargingRoomDataType, i: number) => (
        <RechargingRoomItem
          key={i}
          roomData={item}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      ))}
      <RechargingBtn
        isSelected={isSelected}
        branchId={branchId}
        setOpenModal={setOpenModal}
      />

      {openModal ? (
        <RechargingConfirmModal setOpenModal={setOpenModal} isSelected={isSelected} />
      ) : (
        ''
      )}
    </div>
  );
};

export default RechargingRoomIndex;
