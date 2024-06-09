import React, { Dispatch } from 'react';
import { SelectedState } from './RechargingRoomIndex';
import { useMutation, useQueryClient } from 'react-query';
import { reservationRecharging } from '../remote/recharging';

interface RechargingBtnType {
  isSelected: SelectedState;
  branchId: number;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

const RechargingBtn = ({ isSelected, branchId, setOpenModal }: RechargingBtnType) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    ({ rechargingRoomId, startAt }: SelectedState) =>
      reservationRecharging({
        rechargingRoomId,
        startAt
      }),
    {
      onSuccess: () => {
        setOpenModal(true);
        queryClient.invalidateQueries(['rechargingRooms', branchId]);
      }
    }
  );

  const formatDateWithCurrentDate = (time: string): string => {
    const today = new Date();
    const [hours, minutes] = time.split(':');
    today.setHours(parseInt(hours, 10));
    today.setMinutes(parseInt(minutes, 10));
    today.setSeconds(0);
    today.setMilliseconds(0);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${time}:00`;
  };

  const formattedStartAt = isSelected.startAt
    ? formatDateWithCurrentDate(isSelected.startAt)
    : '';

  return (
    <div
      onClick={() => {
        if (isSelected.rechargingRoomId != 0 && formattedStartAt !== '') {
          mutateAsync({
            rechargingRoomId: isSelected.rechargingRoomId,
            startAt: formattedStartAt
          });
        }
      }}
      className={`
    ${isSelected.rechargingRoomId != 0 && isSelected.startAt != '' ? 'bg-space-purple text-white cursor-pointer' : 'border border-gray-400 text-gray-600'}
    mt-[45px] flex text-[16px] font-normal items-center justify-center w-[361px] h-12 mx-4  rounded-lg
`}>
      {isSelected ? '예약 확정' : '예약'}
    </div>
  );
};

export default RechargingBtn;
