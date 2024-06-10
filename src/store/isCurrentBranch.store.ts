import { create } from 'zustand';

interface useIsCurrentBranchType {
  isCurrent: boolean;
  /* eslint-disable no-unused-vars */
  setIsCurrent: (payload: boolean) => void;
}

export const useIsCurrentBranch = create<useIsCurrentBranchType>((set) => ({
  isCurrent: true, //현재 이용중인 좌석과 메인에 설정된 지점이 같은가?
  setIsCurrent: (payload: boolean) =>
    set(() => ({
      isCurrent: payload
    }))
}));
