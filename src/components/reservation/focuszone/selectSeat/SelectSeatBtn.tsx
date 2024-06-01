import React, { Dispatch } from 'react';
import { useMutation } from 'react-query';
import { focuszoneRequest } from '../../remote/focuszone';
import { useBranchStore } from '@/store/branch.store';

interface SelectSeatBtnType {
  selectedSeat: string | null;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const SelectSeatBtn = ({ selectedSeat, setModalOpen }: SelectSeatBtnType) => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  // focusTodo : 확정누르면 예약 하기

  const { mutateAsync } = useMutation(
    (seatId: string) =>
      focuszoneRequest({
        branch: selectedBranch?.branchName as string,
        seat: seatId
      }),
    {
      onSuccess: () => {
        setModalOpen(true);
      }
    }
  );

  return (
    <div className="mt-6">
      {selectedSeat ? (
        <>
          <div className="flex items-center justify-center text-base font-medium text-space-black">
            선택한 좌석은
            <span className="text-space-purple px-1 font-semibold">
              {' '}
              {selectedSeat}번 좌석{' '}
            </span>
            입니다.
          </div>
          <div
            onClick={() => mutateAsync(selectedSeat)}
            className="cursor-pointer mt-[30px] w-full py-[13px] rounded-lg bg-space-purple flex items-center justify-center font-normal text-[15px] text-white">
            예약 확정
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center text-base font-medium text-space-black">
            좌석을 선택해주세요.
          </div>
          <div className="mt-[30px] w-full py-[13px] rounded-lg border border-gray-400 flex items-center justify-center font-normal text-[15px] text-gray-500">
            예약
          </div>
        </>
      )}
    </div>
  );
};

export default SelectSeatBtn;
