import React, { useState } from 'react';
import SearchModal from './SearchModal';
import SelectOfficeMap from './SelectOfficeMap';
import { Branch } from '@/api/types/branch';
import { useBranchStore } from '@/store/branch.store';

const CurrentOffice = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const setSelectedBranch = useBranchStore((state) => state.setSelectedBranch);

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    setShowSearchModal(false);
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  return (
    <>
      <div className="flex items-center gap-[10px] mt-6 relative">
        <div className="text-white text-lg font-extralight">지금 이용중인 곳은</div>
        <div className="flex items-center justify-center gap-1">
          <div>
            <img src="/home/location.svg" alt="" />
          </div>
          <div className="text-white text-lg underline font-medium cursor-pointer" onClick={handleSearchClick}>
            {selectedBranch ? selectedBranch.branchName : 'ㅌㅌ'}
          </div>
        </div>
      </div>
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} onBranchSelect={handleBranchSelect} />}
      {selectedBranch && <SelectOfficeMap branch={selectedBranch} onClose={() => setSelectedBranch(null)} />}
    </>
  );
};

export default CurrentOffice;
