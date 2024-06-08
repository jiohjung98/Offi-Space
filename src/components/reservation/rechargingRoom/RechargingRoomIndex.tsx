import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRechargingRoom } from '../remote/recharging';
import { useBranchStore } from '@/store/branch.store';
import { useBranchStore2 } from '@/store/reserve.store';
import RechargingHead from './RechargingHead';
import RechargingRoomItem from './RechargingRoomItem';
import { rechargingRoomDataType } from '../model/recharging';
import RechargingBtn from './RechargingBtn';

const RechargingRoomIndex = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
  const reservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);

  const [isSelected, setIsSelected] = useState(false);

  const currentBranch =
    updatedTimeSelected &&
    updatedTimeReserved &&
    updatedTimeSelected > updatedTimeReserved
      ? selectedBranch
      : reservedBranch;

  const branchId = currentBranch?.branchId as number;

  const { data } = useQuery(
    ['rechargingRooms', branchId],
    () => getRechargingRoom(branchId),
    {
      enabled: !!branchId
    }
  );

  if (data == undefined) {
    return null;
  }

  return (
    <div>
      <RechargingHead branchId={branchId} count={data?.length} />
      {data?.map((item: rechargingRoomDataType, i: number) => (
        <RechargingRoomItem key={i} roomData={item} setIsSelected={setIsSelected} />
      ))}
      <RechargingBtn isSelected={isSelected} />
    </div>
  );
};

export default RechargingRoomIndex;
