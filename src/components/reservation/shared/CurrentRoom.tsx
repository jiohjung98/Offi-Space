import { useBranchStore } from '@/store/branch.store';
import React from 'react';

const CurrentRoom = () => {
  const selectedBranch = useBranchStore((state) => state.selectedBranch);

  return (
    <>
      {/* todo : div 클릭시 지오님이 만드신 지점 설정으로 이동되게 부탁드립니다 */}
      <div
        onClick={() => {}}
        className="py-5 flex items-center gap-[7px] cursor-pointer max-w-max">
        <div>
          <img src="/reservation/location.svg" alt="" />
        </div>
        <div className="text-space-black font-semibold tesx-sm ">
          {/* todo : 지정 안되어 있을때는 강남점으로 지정 */}
          {selectedBranch?.branchName}
        </div>
        <div>
          <img src="/reservation/toBottom.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default CurrentRoom;
