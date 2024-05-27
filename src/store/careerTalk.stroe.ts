import { create } from 'zustand';

interface useCareerTalkType {
  modalOpen: boolean;
  /* eslint-disable no-unused-vars */
  setModal: (payload: boolean) => void;
  initialPosition: string;
  setPosition: (payload: string) => void;
}

export const useCareerTalk = create<useCareerTalkType>((set) => ({
  modalOpen: false,
  initialPosition: '디자인', //todo : user 정보 중 jobposition 데이터 가져와서 넣어주기
  setModal: (payload: boolean) =>
    set(() => ({
      modalOpen: payload
    })),
  setPosition: (payload: string) =>
    set(() => ({
      initialPosition: payload
    }))
}));
