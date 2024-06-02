import React, { useState, useEffect } from 'react';
import { useBranchStore } from '@/store/branch.store';
import SearchModal from '@/components/home/SearchModal';
import SelectOfficeMap from '@/components/home/SelectOfficeMap';
import { Branch } from '@/api/types/branch';

const CurrentRoom = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSelectOfficeMap, setShowSelectOfficeMap] = useState(false);
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const setSelectedBranch = useBranchStore((state) => state.setSelectedBranch);

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
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

  return (
    <>
      <div
        onClick={handleSearchClick}
        className="py-5 flex items-center gap-[7px] cursor-pointer max-w-max mx-4">
        <div>
          <img src="/reservation/location.svg" alt="location icon" />
        </div>
        <div className="text-space-black font-semibold text-sm">
          {selectedBranch?.branchName || '강남점'}
        </div>
        <div>
          <img src="/reservation/toBottom.svg" alt="dropdown icon" />
        </div>
      </div>
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} onBranchSelect={handleBranchSelect} />}
      {showSelectOfficeMap && selectedBranch && (
        <SelectOfficeMap branch={selectedBranch} onClose={handleCloseSelectOfficeMap} />
      )}
    </>
  );
};

export default CurrentRoom;
