import useOnClickOutside from '@/components/community/hooks/useOnClickOutside';
import React, { Dispatch, useRef } from 'react';
import { useMutation } from 'react-query';
import { reservationFocus } from '../../remote/focuszone';
import { useBranchStore } from '@/store/branch.store';
import { Branch } from '@/api/types/branch';

interface CheckModalType {
  modalDeskId: number | null;
  setCheckModal: Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: Dispatch<React.SetStateAction<boolean>>;
  branch: Branch;
}

const CheckModal = ({ modalDeskId, setCheckModal, setModalOpen, branch }: CheckModalType) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setCheckModal(false));
  const setSelectedBranch = useBranchStore((state) => state.setSelectedBranch);

  const { mutateAsync } = useMutation(
    async (deskId: number) => reservationFocus(deskId),
    {
      onSuccess: () => {
        handleBranchSelect(branch);
        setCheckModal(false);
        setModalOpen(true);
      }
    }
  );

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch, Date.now());
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-[9999]">
      <div
        ref={ref}
        className="z-50 w-[281px] bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
        <div className="mt-9 flex items-center justify-center text-space-black text-lg font-bold">
          현재 이용 중인
        </div>
        <div className="flex items-center justify-center text-space-black text-lg font-bold">
          포커스존 좌석이 있습니다.
        </div>
        <div className="mt-2 flex items-center justify-center text-[15px] font-normal text-space-black">
          좌석 예약 시 기존 좌석은 취소됩니다.
        </div>
        <div className="mt-5 flex cursor-pointer border-t border-gray-300">
          <div
            onClick={() => setCheckModal(false)}
            className="py-[9px] flex-1 flex items-center justify-center border-r border-gray-300 text-gray-500 text-lg font-normal">
            취소
          </div>
          <div
            onClick={() => {
              if (modalDeskId) {
                mutateAsync(modalDeskId);
              }
            }}
            className="py-[9px] flex-1 flex items-center justify-center text-space-purple text-lg font-semibold">
            바로 예약
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
