import { create } from 'zustand';

interface useInterestTalkType {
  initialTag: string;
  setTag: (payload: string) => void;
}

export const useInterestTalk = create<useInterestTalkType>((set) => ({
  initialTag: '전체', //todo : user 정보 중 jobposition 데이터 가져와서 넣어주기
  setTag: (payload: string) =>
    set(() => ({
      initialTag: payload
    }))
}));
