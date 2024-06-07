import React, { useState, useEffect } from 'react';
import { useBranchStore } from '@/store/branch.store';
import { useBranchStore2 } from '@/store/reserve.store';
import SharedSearchModal from './SharedSearchModal';
import SharedSelectOffice from './SharedSelectOffice';
import { Branch } from '@/api/types/branch';

const CurrentRoom = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSelectOfficeMap, setShowSelectOfficeMap] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [reservedBranch, setReservedBranch] = useState<Branch | null>(null);
  const [selectedUpdatedTime, setSelectedUpdatedTime] = useState<number | null>(null);
  const [reservedUpdatedTime, setReservedUpdatedTime] = useState<number | null>(null);

  const updateSelectedBranch = useBranchStore((state) => state.selectedBranch);
  const updateSelectedBranchTime = useBranchStore((state) => state.updatedTimeSelected);
  const updateReservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updateReservedBranchTime = useBranchStore2((state) => state.updatedTimeReserved);

  useEffect(() => {
    setSelectedBranch(updateSelectedBranch);
    setSelectedUpdatedTime(updateSelectedBranchTime);
  }, [updateSelectedBranch, updateSelectedBranchTime]);

  useEffect(() => {
    setReservedBranch(updateReservedBranch);
    setReservedUpdatedTime(updateReservedBranchTime);
  }, [updateReservedBranch, updateReservedBranchTime]);

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    setSelectedUpdatedTime(Date.now());
    setShowSearchModal(false);
    setShowSelectOfficeMap(true);
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const handleCloseSelectOfficeMap = () => {
    setShowSelectOfficeMap(false);
  };

  useEffect(() => {
    console.log('Selected Branch Updated:', selectedBranch);
  }, [selectedBranch]);

  useEffect(() => {
    console.log('Reserved Branch Updated:', reservedBranch);
  }, [reservedBranch]);

  const currentBranch =
    selectedUpdatedTime &&
    reservedUpdatedTime &&
    selectedUpdatedTime > reservedUpdatedTime
      ? selectedBranch
      : reservedBranch;

  // const currentBranch = selectedBranch;

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="py-5 flex items-center gap-[7px] cursor-pointer max-w-max mx-4">
        <div>
          <img src="/reservation/location.svg" alt="location icon" />
        </div>
        <div className="text-space-black font-semibold text-sm">
          {currentBranch ? currentBranch.branchName : '강남1호점'}
        </div>
        <div>
          <img src="/reservation/toBottom.svg" alt="dropdown icon" />
        </div>
      </div>
      {showSearchModal && (
        <SharedSearchModal
          onClose={() => setShowSearchModal(false)}
          onBranchSelect={handleBranchSelect}
        />
      )}
      {showSelectOfficeMap && currentBranch && (
        <SharedSelectOffice branch={currentBranch} onClose={handleCloseSelectOfficeMap} />
      )}
    </>
  );
};

export default CurrentRoom;
