import { create } from 'zustand';

interface useInterestTalkType {
  initialTag: string;
  /* eslint-disable no-unused-vars */
  setTag: (payload: string) => void;
}

export const useInterestTalk = create<useInterestTalkType>((set) => ({
  initialTag: '전체',
  setTag: (payload: string) =>
    set(() => ({
      initialTag: payload
    }))
}));
